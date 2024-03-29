# performance_app - pomodoro app

## General info

The purpose of this app is to enhance your study concentration and track your productive hours.
It features two sections - a stopwatch and a pomodoro timer.

## Technologies

Project is created with:

- Python3
- Flask
- Javascript
- SQLite3
- HTML5
- CSS3

## Two sections

![](./gifs/2sections.gif)

## Pomodoro

![](./gifs/pomodoro.gif)

## Stopwatch

![](./gifs/stopwatch.gif)

## Night mode

![](./gifs/night_mode.gif)

## Setup

To run this app on your local server, simply download it and change to its directory.
Then install all the needed python dependencies using pip command below.
Run the project using flask run

For Linux || MacOs:

```console
$ cd /performace_app
$ python3 -m venv ./venv
$ pip install -r ./requirements.txt
$ . ./venv/bin/activate
$ export FLASK_ENV=development
$ export FLASK_APP=performance_app
$ flask run
```

For Windows:

```console
> cd \performance_app
> python -m venv .\venv
> .\venv\Scripts\activate
> pip install -r .\requirements.txt
> set FLASK_ENV=development
> set FLASK_APP=performance_app
> flask run

```
