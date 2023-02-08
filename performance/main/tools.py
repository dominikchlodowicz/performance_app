def small_time_value(value):
    val = int(value)
    if val < 10:
        return f'0{val}'
    else:
        return value