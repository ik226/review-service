import scrapy
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from webdriver_manager.chrome import ChromeDriverManager
from logzero import logger

class NaverShoppingSearchSpider(scrapy.Spider):
  name = 'NaverShoppingSearchSpider'

  naver_shopping_url = 'https://shopping.naver.com/'

  def start_requests(self):
    return [scrapy.Request(url=self.naver_shopping_url)]

  def parse(self, response):
    # init chrome driver
    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    desired_capabilities = options.to_capabilities()
    driver = webdriver.Chrome(ChromeDriverManager().install(), desired_capabilities=desired_capabilities)

    driver.get(response.url)

    # get search query from somewhere
    query_text = '공기청정기'

    # do search
    search_input = driver.find_element_by_xpath('//input[@class=co_srh_input _input N=a:SNB.search]')
    search_input.send_keys(query_text, Keys.RETURN)

    # wait for loading
    try:
      search_results = WebDriverWait(driver, 5).until(EC.presence_of_all_elements_located(By.ID, '__next'))

      # store results urls
    finally:
      driver.quit()


