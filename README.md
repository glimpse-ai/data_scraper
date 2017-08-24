# Glimpse Data Scraper

1. Pull HTML from remote urls into local HTML files with inline-styled CSS

    ```
    $ python scrape.py
    ```

2. Manually evaluate the HTML files to fix/remove outliers

    ```
    $ python eval.py
    ```

3. Duplicate HTML files with `<section>` siblings that can be permutated

    ```
    $ python permutate.py
    ```

4. Capture screenshots of each HTML file

    ```
    $ python capture.py
    ```

5. Translate all HTML files to DML

    ```
    $ python translate.py
    ```