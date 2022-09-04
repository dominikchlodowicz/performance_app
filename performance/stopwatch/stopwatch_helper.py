from flask import render_template, redirect, make_response, session, request, url_for
from ..main.database import insert_db, get_value_db

def insert_time(user_id, route):
    if request.form['reset'] == 'reset':
        #getting data from frontend
        request_data = request.form['time'].split(':')
        if request_data == ['']:
            return redirect(url_for(f'main.{route}'))
        else:
            hours = int(request_data[0])
            minutes = int(request_data[1])
            seconds = int(request_data[2])

            #inserting data to database
            insert_db(user_id, hours, minutes, seconds)
            return redirect(url_for(f'main.{route}'))

def get_time(user_id, template):
    #creating user_id if it doesn't exist
    if user_id == None:
        response = make_response(render_template(template))
        response.set_cookie('user_id', session['userid'])
        session['time'] = '00:00:00'
        return response
    #getting the last work time from the database
    else:
        time = get_value_db(user_id)
        if time == None:
            session['time'] = '00:00:00'
        else:
            session['time'] = time
            return render_template(template)

def timer_helper(route, template):
    #try to get cookie
    cookie_user_id = request.cookies.get('user_id')

    if request.method == 'POST':
        return insert_time(cookie_user_id, route)

    elif request.method == 'GET':
        return get_time(cookie_user_id, template)
