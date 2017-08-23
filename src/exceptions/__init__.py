import selenium.common.exceptions as common

UnexpectedAlertPresentException = common.UnexpectedAlertPresentException
StaleElementReferenceException = common.StaleElementReferenceException
WebDriverException = common.WebDriverException
TimeoutException = common.TimeoutException


class NoDNSRecordFoundException(BaseException):
  message = 'No DNS records found.'


class URLBlacklistedException(BaseException):
  message = 'URL is blacklisted.'


class TooManyElementsException(BaseException):

  def __init__(self, message):
    self.message = message


class BatchesTooSlow(BaseException):
  message = 'Batches taking too long.'


class NoChildrenInBody(BaseException):
  message = 'Body has no children.'