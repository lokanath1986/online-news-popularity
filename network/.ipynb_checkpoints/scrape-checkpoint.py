import scrapy
from urllib.parse import urljoin
import numpy as np
import pandas as pd



class ProductsSpider(scrapy.Spider):
    cols = ['url']
    raw_data = pd.read_csv('data/OnlineNewsPopularity.csv', usecols=cols)
    name = "content"
    start_urls = raw_data['url'].tolist()

    def parse(self, response):
         for post in response.css('.post'):
                yield {'content': post.css('.article-content ::text').extract(), 'url': response.request.url}