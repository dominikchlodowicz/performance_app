def validate_time(value_tuple):
    if value_tuple[0].isnumeric() == False:
        return 'Input is not numeric!'

    value = int(value_tuple[0])
    time_value =  value_tuple[1]
    
    if time_value == 'minutes' and value > 59:
        return 'Too many minutes!'
    
    if time_value == 'minutes' and value == 60:
        value += 1
        time_value = 'hours'
    
    if value <= 0:
        return 'Cant input zeros or negative numbers!'

    return (value, time_value)

    #TODO:
    '''
        - Only numeric
        - Not more then 60 minutes
        - Required
        
        - Sending output to frontend staright so already 
            validating on client-side
    
    '''


    
