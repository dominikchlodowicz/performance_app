from flask import render_template, redirect, make_response, session, request, url_for
from ..main.database import insert_time, get_time


def view_time(route, template):
    cookie_user_id = request.cookies.get('user_id')
    if request.method == 'POST':
        if request.form['reset'] == 'reset':
            #getting data from request
            request_data = request.form['time'].split(':')
            hours = int(request_data[0])
            minutes = int(request_data[1])
            seconds = int(request_data[2])

            #inserting data to database
            insert_time(cookie_user_id, hours, minutes, seconds)
            return redirect(url_for(f'main.{route}'))

    elif request.method == 'GET':
        #try to get cookie
        if cookie_user_id == None:
            print('cookie doesn\'t exist')
            response = make_response(render_template(template))
            response.set_cookie('user_id', session['userid'])
            session['time'] = '00:00:00'
            return response
        else:
            print(f'cookie exists {cookie_user_id}')
            time = get_time(cookie_user_id)
            if time == None:
                session['time'] = '00:00:00'
            else:
                session['time'] = time
            return render_template(template)
