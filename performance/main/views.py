from flask import render_template, request, redirect, url_for, session, make_response
from .database import insert_time, get_time
from . import main
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
     cookie_user_id = request.cookies.get('user_id')
     if request.method == 'POST':
          if request.form['reset'] == 'reset':
               #getting data from request
               request_data = request.form['time'].split(':')
               hours = int(request_data[0])
               minutes = int(request_data[1])
               seconds = int(request_data[2])

               #inserting it to database
               insert_time(cookie_user_id, hours, minutes, seconds)
               return redirect(url_for('main.timer'))

     elif request.method == 'GET':
          #try to get cookie
          if cookie_user_id == None:
               print('cookie doesn\'t exist')
               response = make_response(render_template('timer.html'))
               response.set_cookie('user_id', session['userid'])
               session['time'] = '00:00:00'
               return response
          else:
               print('cookie exists')
               time = get_time(cookie_user_id)
               if time == None:
                    session['time'] = '00:00:00'
               else:
                    session['time'] = time
               return render_template('timer.html')
