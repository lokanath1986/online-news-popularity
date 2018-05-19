# Online news popularity 

## Assignment
I was given the Mashable online news popularity [dataset](https://archive.ics.uci.edu/ml/datasets/online+news+popularity), with the goal of being able to predict the popularity of given articles. As the target variable (`shares`) is continous value, and my task was classification, I was told to form categories to be able to make classification task. With my model finished, I was asked to create a public API to serve the trained model's prediction as a service. Every other detail was up to me.

## High level solution

![Solution](https://github.com/nagypeterjob/online-news-popularity/blob/master/arch.png "Solution")

### Model
My solution relies heavily on the AWS stack. The model and weights are placed in S3 Buckets. Though my model is a few kbytes, it is a best practice to store your model in a dedicated storage especially when the weights are several giga bytes, you want to store multiple versions or when the training pipeline is automated.
I used pandas and keras to experiment and train the model. My final solution is fully connected, quite shallow deep neural network. My final accuracy was ~0.36 with 4 categories. I found this result really really poor, so I started to investigate. I created a model with only 2 categories in order to reduce the problem for a binary classification. That way I was able to achieve ~0.63 accuracy. I found some school assignment papers where the authors claimed that they achieved around 70% accuracy on the binary problem with Decision Trees. I wasn't able to reproduce their results even with the same features & algorithm. I was thinking on bringing in extra data for training, but the feature engineering on the original dataset makes it really hard. Quote:
>We performed a logarithmic transformation to scale the unbounded numeric features (e.g., number of words in article), while the nominal attributes were transformed with the common 1-of-C encoding.

After seeing that these features doesn't provide enough information for strong classification capabilities, hoping that text does, I crawled the articles in question and parsed the article titles from urls as well. Spolier: with exclusively textual data I achieved even worse results. I sticked with the fully connected solution and used Hyperas to tune the model. I am confident to say, that this dataset has weak features to make powerful classification task. Either there is no direct correlation or there is simply not enough training data.

My designated categories are:
- **Few** (shares <= 945)
- **Modest** (shares <= 1400)
- **Lot** (shares <= 2700)
- **Popular** (shares > 2700)

With this category selection the data stayed balanced.

See [this](https://github.com/nagypeterjob/online-news-popularity/blob/master/network/fully_connected_binary.ipynb) notebook for the binary problem, and see [this](https://github.com/nagypeterjob/online-news-popularity/blob/master/network/fully_connected_multi.ipynb) for the multi-class problem.

### Rest API
The REST API service is hosted on an EC2 instance. As for the implementation I chose Flask (python) because it works well with Keras given the same language. This way I didn't need any proxy layer to call a python script for prediction. I chose the run the service in docker container (as it is guaranteed to run the same as on my machine, easy to distribute the image via Docker Hub, easy to set up and maintain). I also planned to set up some kind of orchestration, but it would have brought unnecessary complexity such as load balancing so finally I dropped the idea. I use the `uwsgi-nginx-flask` base image. It makes possible for python web services to run really efficient thanks to the uwsgi application server & nginx. 
The service does:
- Loads the model from S3 storage
- Parses request payload
- Makes prediction via model
- JSON response

### API:

Use the following curl script to call the service: (see feature explanation [here](https://archive.ics.uci.edu/ml/datasets/online+news+popularity))
```bash
curl -X POST -H 'Content-type: application/json' 'http://ec2-52-57-163-24.eu-central-1.compute.amazonaws.com/predict' -d '
{
  "content": {
    "data_channel_is_socmed": 0,
    "data_channel_is_tech": 0,
    "data_channel_is_bus": 0,
    "data_channel_is_world": 0,
    "data_channel_is_entertainment": 0,
    "is_weekend": 0,
    "weekday_is_friday": 0,
    "weekday_is_monday": 0,
    "weekday_is_tuesday": 0,
    "weekday_is_thursday": 0,
    "weekday_is_wednesday": 0,
    "title_sentiment_polarity": 0,
    "n_tokens_title": 0,
    "global_sentiment_polarity": 0
  }
}'
```
You should receive a similar response:
```bash
{
  "response": [
    [
      0.23312070965766907,
      0.25697532296180725,
      0.22893968224525452,
      0.28096428513526917
    ]
  ]
}
```

### UI
For making prediction more convinient I created a very small and dull frontend service which is hosted in S3 Static hosting.
You can use the ui [here](http://lmi-frontend-bucket.s3-website.eu-central-1.amazonaws.com/).

## Bottlenecks and what could be improved
- Reloading models from S3 on each API request is inefficient and will eventually costs you money. It is especially painful when the weights are chunky. A possible solution is that when the training is finished & the new model is uploaded to S3 an another endpoint is being called which preloads the model for your service. That way the model is only loaded once after the training is finished. An other solution would be to timestamp each trained model & keep track of the latest timestamp. That way one could have versioning and only the latest model would be pulled for the service.
- The training pipeline could be automated, run as script periodically instead of jupyther notebook. 
- It should be guaranteed that after each training the same features are used/selected, or the selected features are tracked dinamically, so that the prediction services (API, UI) won't break on each change.
- This whole ecosystem could be replaced with AWS SageMaker or similar services.
