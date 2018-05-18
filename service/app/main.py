#!flask/bin/python
from flask import Flask
from flask import request
import numpy as np
import pandas as pd
import boto3
import os
import sys
import json
from pandas.io.json import json_normalize
from keras.models import model_from_json
import time
from flask import jsonify
from flask_cors import CORS
import logging
import allowed_params

app = Flask(__name__)
#Enable CORS so we can call the service via ajax request
#TODO: Specify ips, so the service is not exposed
CORS(app)

#Health check: We (and the Orchestration tool) can easly test whether the service is up & running
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'health': 'good'})

#Endpoint that serves the pretrained model's prediction
@app.route('/predict', methods=['POST', 'GET'])
def predict():
    app.logger.info('[LOG]: Request hit')
    start = time.time()
    #Load models from S3
    #TODO: Implement service to prefech models after each successful training
    model = preload_models()
    end = time.time()
    app.logger.info('[LOG]: Models loaded in ' + str(end-start) + ' secs')

    data = request.get_json(silent=False)
    app.logger.info(data)

    input = data['content']
    app.logger.info('[LOG]: Parsed params')
    app.logger.info('[LOG]: Data length is ' + str(len(input)))
    #Create DataFrame & in the same time filter input cols
    X = pd.DataFrame(data=[input], columns=allowed_params.get_allowed_params())
    app.logger.info(X)
    app.logger.info('[LOG]: Calling prediction')
    
    pred = model.predict(np.array(X[0:1]))
    return jsonify({'response': pred.tolist()})

#Pulling specific model & weight file from S3 Bucket
def load_model(model_name, weight_name, w_name):
    s3_client = boto3.resource('s3')
    BUCKET = 'lmi-model-bucket'
    FOLDER = 'model'

    MODEL_FILE = model_name
    WEIGHT_FILE = weight_name

    MODEL_PATH = FOLDER + '/' + MODEL_FILE
    WEIGHT_PATH = FOLDER + '/' + WEIGHT_FILE

    model = s3_client.Object(BUCKET, MODEL_PATH)
    weights = s3_client.Object(BUCKET, WEIGHT_PATH)

    model_content = model.get()['Body'].read().decode('utf-8')
    weight_content = weights.get()['Body'].read()

    loaded_model = model_from_json(model_content)
    #Write weight to disk as it cannot be passed "on the fly" as file 
    with open(w_name,'wb') as f:
        f.write(weight_content)

    loaded_model.load_weights(w_name)
    return loaded_model

def preload_models():
    model = load_model('multi_model.json', 'multi_weights.h5', 'multi_weight.h5')
    return model

@app.before_first_request
def setup_logging():
    if not app.debug:
        # In production mode, add log handler to sys.stderr.
        app.logger.addHandler(logging.StreamHandler())
        app.logger.setLevel(logging.INFO)

if __name__ == '__main__':
    app.run(debug=True)