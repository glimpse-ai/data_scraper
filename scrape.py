from src.inline_styler import InlineStyler
from src.exceptions import *
from src.helpers.cache import get_redis
from src.statuses.urls import *

redis = get_redis()
styler = InlineStyler()


def fetch_urls():
  unfetched_urls = [u for u, status in redis.hgetall('urls').iteritems() if status == UNFETCHED and u]

  if len(unfetched_urls) == 0:
    print 'No more unfetched urls!'
    exit(0)

  print 'Found {} unfetched urls.'.format(len(unfetched_urls))

  # Set this url batch to a status of FETCHING
  # url_hash = {u: FETCHING for u in unfetched_urls}
  # redis.hmset('urls', url_hash)

  return unfetched_urls


if __name__ == '__main__':
  urls = fetch_urls()

  i = 0
  for url in urls:
    print '\nStyling url {} of {}'.format(i, len(urls))

    err = False
    try:
      styler.style_url(url)
      redis.hset('urls', url, FETCH_SUCCESS)
    except KeyboardInterrupt:
      print 'Bye Bye'

      if styler.driver:
        styler.driver.quit()

      exit(0)
    except (
      UnexpectedAlertPresentException,
      StaleElementReferenceException,
      WebDriverException,
      TimeoutException,
      NoDNSRecordFoundException,
      URLBlacklistedException,
      TooManyElementsException,
      BatchesTooSlow,
      NoChildrenInBody), e:
      print e.message or e.msg or e.__class__.__name__
      err = True
    except BaseException, e:
      print 'Unrecognized Exception: {}'.format(e.message or e.msg or e.__class__.__name__)
      err = True

    if err:
      styler.reset()
      redis.hset('urls', url, FETCH_ERROR)

    i += 1