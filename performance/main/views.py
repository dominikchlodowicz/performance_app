from flask import render_template, session, request
from . import main
from .work_time_helper import view_helper
from .pomodoro_config_helper import validate_form_data
import uuid

@main.before_app_first_request
def set_user_id():
     session.permanent = True
     user_id = str(uuid.uuid4())
     session['userid'] = user_id

@main.route('/')
def index():
     return render_template('base.html')

@main.route('/stopwatch', methods=["GET", "POST"])
def stopwatch():
     return view_helper('stopwatch', 'stopwatch.html')

@main.route('/pomodoroconfig', methods=["GET", "POST"])
def pomodoroconfig():          
     if request.method == 'POST':
          # form elements list
          pomodoro_config_values = ('cycles',('workDuration', 'workDurationHrOrMin'), ('breakDuration' ,'breakDurationHrOrMin'))
          return validate_form_data(pomodoro_config_values)

     elif request.method == 'GET':
          return render_template('config.html')

@main.route('/pomodoro', methods=["GET", "POST"])
def pomodoro():
     return view_helper('pomodoro', 'pomodoro.html')

@main.route('/about', methods=["GET"])
def about():
     return render_template('base.html')
