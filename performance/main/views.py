from flask import redirect, render_template, session, request, url_for, make_response
from . import main
from ..stopwatch.stopwatch_handling import view_time
from .validation import validate_time
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

@main.route('/pomodoroconfig', methods=["GET", "POST"])
def pomodoroconfig():          
     if request.method == 'POST':

          config_values = ('intervals',('durationInterval', 'durationIntervalTime'), ('durationBreak' ,'durationBreakTime'))
          response = make_response(redirect(url_for('main.pomodoro')))

          for form_element_name in config_values:

               if form_element_name == config_values[0]:
                    response.set_cookie(f'{form_element_name}', request.form[form_element_name])

               else:
                    validated_data = validate_time((request.form[form_element_name[0]], request.form[form_element_name[1]]))
                    if type(validated_data) != tuple:
                         session['error'] = validated_data
                         return redirect(url_for('main.pomodoroconfig'))
                    else:
                         session['error'] = None
                         response.set_cookie(f'{form_element_name[0]}', str(validated_data[0]))
                         response.set_cookie(f'{form_element_name[1]}', str(validated_data[1]))
                         return response

     elif request.method == 'GET':
          print('GET method')
          return render_template('config.html')

@main.route('/pomodoro', methods=["GET", "POST"])
def pomodoro():
     return render_template('pomodoro.html')
