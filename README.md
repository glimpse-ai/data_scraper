# Glimpse Data Scraper

Project used for converting urls into DML and images for the Glimpse dataset.

## Requirements

Python 2.7.X
pip
virtualenv
autoenv
[ChomeDriver](http://chromedriver.storage.googleapis.com/index.html)
[Redis](https://redis.io/topics/quickstart)

## Setup

1. Download the [ChomeDriver](http://chromedriver.storage.googleapis.com/index.html) executable and place it somewhere memorable (I chose `/usr/local/lib/chromedriver`). 

2. Run `$ python setup.py` to create some gitignored directories and your `.env` file.

3. Add the following environment variables to your `.env` file:

    ```
    export REDIS_URL="<YOUR_REDIS_URL>"
    export CHROMEDRIVER="/path/to/chromedriver"
    ```

4. Create a new virtual environment and activate it:

    ```
    $ virtualenv venv && source venv/bin/activate 
    ```

5. Install python library requirements:

    ```
    $ pip install -r requirements.txt
    ```

6. Activate your environment variables:

    ```
    $ source ~/.bashrc
    $ cd .
    ```

## Usage

1. Populate your redis instance with a dictionary of urls set to the key `'urls'`, with keys being urls and values being `'0'`:

    ```python
    from src.helpers.cache import get_redis
    from from src.statuses.urls import UNFETCHED
    
    redis = get_redis()
    
    urls = ['http://google.com/', ...]  # list of urls you want to scrape
    url_hash = {u: UNFETCHED for u in urls}
    redis.hmset('urls', url_hash)
    ```

2. Scrape HTML from urls into local HTML files with inline-styled CSS

    ```
    $ python scrape.py
    ```

3. Manually evaluate the HTML files to fix/remove outliers (optional).

    ```
    $ python eval.py
    ```

4. Duplicate HTML files with `<section>` siblings that can be permutated

    ```
    $ python permutate.py
    ```

5. Capture screenshots of each HTML file

    ```
    $ python capture.py
    ```

6. Translate all HTML files to DML

    ```
    $ python translate.py
    ```
