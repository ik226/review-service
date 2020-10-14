# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ReviewScraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    text = scrapy.Field()
    score = scrapy.Field()
    sourceName = scrapy.Field()
    sourceUserId = scrapy.Field()
    sourceCreatedAt = scrapy.Field()

    def __new__(self, title, text, score, sourceName, sourceUserId, sourceCreatedAt):
      self.title = title
      self.text = text
      self.score = score
      self.sourceName = sourceName
      self.sourceUserId = sourceUserId
      self.sourceCreatedAt = sourceCreatedAt



