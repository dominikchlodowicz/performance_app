def validate_time(time_tuple):
    try:
        int(time_tuple[0])
    except ValueError:
        return {'validation_flag': False, 'error': 'Input is not numeric!'}

    time = int(time_tuple[0])
    min_or_hr = time_tuple[1]

    if min_or_hr == 'minutes' and time > 59:
        return {'validation_flag': False, 'error': 'Too many minutes!'}

    if min_or_hr == 'minutes' and time == 60:
        time += 1
        min_or_hr = 'hours'

    if time <= 0:
        return {'validation_flag': False, 'error': 'Cant input zeros or negative numbers!'}

    return {'validation_flag': True, 'time': time, 'min_or_hr': min_or_hr}

# format data for frontend
def data_formatting(time, min_or_hr):
    if min_or_hr == 'hours':
        hours = time
        if hours < 10:
            return f'0{hours}:00:00'
        else:
            return f'{hours}:00:00'

    if min_or_hr == 'minutes':
        minutes = time
        if minutes < 10:
            return f'00:0{minutes}:00'
        else:
            return f'00:{minutes}:00'
