from flask import render_template, request, redirect, url_for, session, make_response
from .database import insert_time, get_time
from . import main
from ..stopwatch.stopwatch_handling import view_time
import uuid

@main.route('/')
def index():
     return render_template('timer.html')

@main.before_app_first_request
def set_user_id():
     session.permanent = True
     user_id = str(uuid.uuid4())
     session['userid'] = user_id

@main.route('/timer', methods=["GET", "POST"])
def timer():
     return view_time('timer', 'timer.html')

# @main.route('/pomodoro', methods=["GET", "POST"])
# def pomodoro():
#      pass
