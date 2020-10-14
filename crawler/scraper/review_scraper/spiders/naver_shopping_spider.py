from datetime import datetime
import scrapy
from selenium import webdriver


# TODO: inherits scrapy.Selector
class GetterSelectors(scrapy.Selector):
  @staticmethod
  def getReviewList(selector):
    return selector.xpath('.//li[@class="thumb_nail"]')

  @staticmethod
  def getTitle(selector):
    return selector.xpath('.//p[@class="subjcet"]/strong/text()')

  @staticmethod
  def getText(selector):
    return selector.xpath('.//div[@class="atc"]/text()')

  @staticmethod
  def getScore(selector):
    return selector.xpath('.//div[@class="avg_area"]//span[@class="curr_avg"]/strong/text()')

  @staticmethod
  def getSourceName(selector):
    return selector.xpath('.//div[@class="avg_area"]//span[@class="info"]/span[@class="info_cell"][1]/text()')

  @staticmethod
  def getSourceUserId(selector):
    return selector.xpath('.//div[@class="avg_area"]//span[@class="info"]/span[@class="info_cell"][2]/text()')

  @staticmethod
  def getSourceCreatedAt(selector):
    return selector.xpath('.//div[@class="avg_area"]//span[@class="info"]/span[@class="info_cell"][3]/text()')


# TODO: convert util
def convertSourceCreatedAtToTimestamp(dateText):
  dateTextFilter = filter(lambda dateText: bool(len(dateText)), dateText.split('.'))
  dateArray = list(map(lambda date: int(date), dateTextFilter))
  createdAtDate = datetime(dateArray[0] + 2000, dateArray[1], dateArray[2])
  return createdAtDate.timestamp()

def canConvertToInt(str):
  try:
    int(str)
    return True
  except:
    return False


class NaverShoppingSpider(scrapy.Spider):
  name = 'naver_shopping_spider'
  start_urls = [
    'https://search.shopping.naver.com/detail/detail.nhn?nvMid=15298074416&adId=nad-a001-02-000000044276045&channel=nshop.npla&query=%EA%B1%B4%EC%A1%B0%EA%B8%B0&NaPm=ct%3Dkfo7fi9c%7Cci%3D0zm0002snRbtDSxMl0Wd%7Ctr%3Dpla%7Chk%3Da45dfed61a0e23e3b97d81b2a4cf41e11658304a&cid=0zm0002snRbtDSxMl0Wd',
  ]

  # def __init__(self):
    # self.driver = webdriver.Chrome()

  def parse_review(self, response):
    for review in GetterSelectors.getReviewList(response):
      # self.logger.info("review", review.get())
      yield {
        'title': GetterSelectors.getTitle(review).get(),
        'text': GetterSelectors.getText(review).get(),
        'score': GetterSelectors.getScore(review).get(),
        'sourceName': GetterSelectors.getSourceName(review).get(),
        'sourceUserId': GetterSelectors.getSourceUserId(review).get(),
        'sourceCreatedAt': convertSourceCreatedAtToTimestamp(GetterSelectors.getSourceCreatedAt(review).get()),
      }

    # for review in GetterSelectors.getReviewList(response):
    #   yield ReviewScraperItem(
    #     GetterSelectors.getTitle(review).get(),
    #     GetterSelectors.getText(review).get(),
    #     GetterSelectors.getScore(review).get(),
    #     GetterSelectors.getSourceName(review).get(),
    #     GetterSelectors.getSourceUserId(review).get(),
    #     convertSourceCreatedAtToTimestamp(GetterSelectors.getSourceCreatedAt(review).get()),
    #   )

  def parse(self, response):
    # self.driver.get(response.url)

    current_page = response.xpath('.//div[@class="review_paging"]/strong').extract_first()
    next_page = response.xpath('.//div[@class="review_paging"]/a')
    next_page_number = next_page.extract_first()
    print('!!!', next_page, next_page_number)
    # self.parse_review(response)

    if canConvertToInt(next_page_number):
      next_page_url = next_page.xpath('./@href').extract_first()
      print('@@@', next_page_url)
      yield scrapy.Request(next_page_url, callback=self.parse_review)



  # def start_requests(self):
  #   return [scrapy.FormRequest("https://search.shopping.naver.com/detail/detail.nhn?nvMid=15298074416&adId=nad-a001-02-000000044276045&channel=nshop.npla&query=%EA%B1%B4%EC%A1%B0%EA%B8%B0&NaPm=ct%3Dkfo7fi9c%7Cci%3D0zm0002snRbtDSxMl0Wd%7Ctr%3Dpla%7Chk%3Da45dfed61a0e23e3b97d81b2a4cf41e11658304a&cid=0zm0002snRbtDSxMl0Wd")]

