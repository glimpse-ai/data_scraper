# Glimpse Data Scraper

Project used for converting urls into DML and images for the Glimpse dataset.

## Requirements

Python 2.7.X<br>
pip<br>
virtualenv<br>
autoenv<br>
[ChomeDriver](http://chromedriver.storage.googleapis.com/index.html)<br>
[Redis](https://redis.io/topics/quickstart)<br>

## Setup

1. Download the [ChomeDriver](http://chromedriver.storage.googleapis.com/index.html) executable and place it somewhere memorable (I chose `/usr/local/lib/chromedriver`). 

2. Run `$ python setup.py` to create some gitignored directories and your `.env` file.

3. Add the following to your `.env` file:

    ```
    export REDIS_URL="<YOUR_REDIS_URL>"
    export CHROMEDRIVER="/path/to/chromedriver"
    ```

4. Activate your environment variables:

    ```
    $ source ~/.bashrc
    $ cd .
    ```

5. Create a new virtual environment and activate it:

    ```
    $ virtualenv venv && source venv/bin/activate 
    ```

6. Install python library requirements:

    ```
    $ pip install -r requirements.txt
    ```

## Usage

1. Populate your redis instance with a dictionary of urls set to the key `'urls'`, with keys being urls and values being `'0'`:

    ```python
    from src.helpers.cache import get_redis
    from src.statuses.urls import UNFETCHED
    
    redis = get_redis()
    
    urls = ['http://google.com/', ...]  # list of urls you want to scrape
    url_hash = {u: UNFETCHED for u in urls}
    redis.hmset('urls', url_hash)
    ```

2. Scrape HTML from urls into local HTML files with inline-styled CSS:

    ```
    $ python scrape.py
    ```

3. Manually evaluate the HTML files to fix/remove outliers (optional):

    ```
    $ python eval.py
    ```
    
    This starts a Flask server. From there, you can open any local html files in your browser and evaluate them with the following keys:
    
    `D` --> moves HTML file to discard directory<br>
    `S` --> saves current working HTML file in place (good for touching up files)

4. Duplicate HTML files with `<section>` siblings that can be permutated:

    ```
    $ python permutate.py
    ```

5. Capture screenshots of each HTML file:

    ```
    $ python capture.py
    ```

6. Translate all HTML files to DML:

    ```
    $ python translate.py
    ```
