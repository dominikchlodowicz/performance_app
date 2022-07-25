from urllib import response
from flask import redirect, render_template, session, request, url_for, make_response
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

@main.route('/pomodoro', methods=["GET", "POST"])
def pomodoro():
     return render_template('pomodoro.html')

@main.route('/pomodoroconfig', methods=["GET", "POST"])
def pomodoroconfig():          
     if request.method == 'POST':
          config_values = ('intervals', 'durationInterval', 'durationIntervalTime', 'durationBreak' ,'durationBreakTime')
          
          response = make_response(redirect('./pomodoro'))
          for form_element_name in config_values:
               response.set_cookie(f'{form_element_name}', request.form[form_element_name])
          return response

     elif request.method == 'GET':
          print('GET method')
          return render_template('config.html')
