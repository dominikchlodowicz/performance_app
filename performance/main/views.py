from flask import redirect, render_template, session, request, url_for, make_response
from . import main
from ..stopwatch.stopwatch_handling import view_time
from .validation import validate_time, data_formatting
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

          # form elements list
          config_values = ('intervals',('workDuration', 'workDurationHrOrMin'), ('breakDuration' ,'breakDurationHrOrMin'))
          #redirect 
          response = make_response(redirect(url_for('main.pomodoro')))

          for form_element_name in config_values:

               if form_element_name == config_values[0]:
                    response.set_cookie(f'{form_element_name}', request.form[form_element_name])

               #validation + data formatting 
               else:
                    print(f'Now iterating through {form_element_name}')
                    validated_data = validate_time((request.form[form_element_name[0]], request.form[form_element_name[1]]))
                    if validated_data['validation_flag'] == False:
                         session['error'] = validated_data['error']
                         return redirect(url_for('main.pomodoroconfig'))

                    elif validated_data['validation_flag']:
                         session['error'] = None
                         response.set_cookie(f'{form_element_name[0]}', str(data_formatting(validated_data['time'], validated_data['min_or_hr'])))
                         if form_element_name == config_values[-1]:
                              return response

     elif request.method == 'GET':
          return render_template('config.html')

@main.route('/pomodoro', methods=["GET", "POST"])
def pomodoro():
     return render_template('pomodoro.html')
