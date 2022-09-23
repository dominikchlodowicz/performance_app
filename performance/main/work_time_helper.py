from flask import render_template, redirect, make_response, session, request, url_for
from .database import insert_db, get_value_db

def insert_time(user_id, route):
    if request.form['reset'] == 'Reset':
        #getting data from frontend
        request_data = request.form['time'].split(':')
        if request_data == ['']:
            return redirect(url_for(f'main.{route}'))
        elif request_data != [''] and route == "pomodoro":
            hours = int(request_data[0])
            minutes = int(request_data[1])
            seconds = int(request_data[2])

            #inserting data to database
            insert_db(route, user_id, hours, minutes, seconds)
            return redirect(url_for('main.reward'))

        else:
            hours = int(request_data[0])
            minutes = int(request_data[1])
            seconds = int(request_data[2])

            #inserting data to database
            insert_db(route, user_id, hours, minutes, seconds)
            return redirect(url_for(f'main.{route}'))

def get_time(user_id, route, template):
    #creating user_id if it doesn't exist
    if user_id == None:
        response = make_response(render_template(template))
        print(f'this is session id {session["userid"]}')
        response.set_cookie('user_id', session['userid'])
        session['time'] = '00:00:00'
        return response
    #getting the last work time from the database
    else:
        time = get_value_db(route, user_id)

        if time == None:
            session['time'] = '00:00:00'
        else:
            session['time'] = time
        
        return render_template(template)

def view_helper(route, template):
    #try to get cookie
    cookie_user_id = request.cookies.get('user_id')
    
    if request.method == 'POST':
        return insert_time(cookie_user_id, route)

    elif request.method == 'GET':
        return get_time(cookie_user_id, route, template)


