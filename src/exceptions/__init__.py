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
  message = 'Too many element batches.'


class BatchesTooSlow(BaseException):
  message = 'Batches taking too long.'


class NoChildrenInBody(BaseException):
  message = 'Body has no children.'


class ScreenshotException(BaseException):
  message = 'Error capturing screenshot of html.'


class ScreenshotException(BaseException):
  message = 'Error capturing screenshot of html.'


class ResizeImageError(BaseException):
  message = 'Error resizing image.'