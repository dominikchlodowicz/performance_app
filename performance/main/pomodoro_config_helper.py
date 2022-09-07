from .validation import validate_time, data_formatting
from flask import redirect, session, request, url_for, make_response

def validate_form_data(pomodoro_config_values):
    #redirect 
    response = make_response(redirect(url_for('main.pomodoro')))

    for form_element_name in pomodoro_config_values:

        if form_element_name == pomodoro_config_values[0]:
            response.set_cookie(f'{form_element_name}', request.form[form_element_name])

        #validation + data formatting 
        else:
            validated_data = validate_time((request.form[form_element_name[0]], request.form[form_element_name[1]]))
            if validated_data['validation_flag'] == False:
                    session['error'] = validated_data['error']
                    return redirect(url_for('main.pomodoroconfig'))

            elif validated_data['validation_flag']:
                    session['error'] = None
                    response.set_cookie(f'{form_element_name[0]}', str(data_formatting(validated_data['time'], validated_data['min_or_hr'])))
                    print(pomodoro_config_values[-1])
                    last_item = pomodoro_config_values[-1]
                    if form_element_name == last_item:
                        return response 