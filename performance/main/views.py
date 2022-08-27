from flask import render_template, session, request
from . import main
from ..stopwatch.stopwatch_handling import view_time
from ..pomodoro.pomodoro_config_handling import validate_form_data
import uuid

@main.before_app_first_request
def set_user_id():
     session.permanent = True
     user_id = str(uuid.uuid4())
     session['userid'] = user_id

@main.route('/')
def index():
     return render_template('timer.html')

@main.route('/timer', methods=["GET", "POST"])
def timer():
     return view_time('timer', 'timer.html')

@main.route('/pomodoroconfig', methods=["GET", "POST"])
def pomodoroconfig():          
     if request.method == 'POST':
          # form elements list
          pomodoro_config_values = ('intervals',('workDuration', 'workDurationHrOrMin'), ('breakDuration' ,'breakDurationHrOrMin'))
          return validate_form_data(pomodoro_config_values)

     elif request.method == 'GET':
          return render_template('config.html')

@main.route('/pomodoro', methods=["GET", "POST"])
def pomodoro():
     return render_template('pomodoro.html')
