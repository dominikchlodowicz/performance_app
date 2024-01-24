from sqlite3 import connect
from flask import g
from config import config
from .tools import small_time_value

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect(config["database"])
    return db

def insert_db(tableName, id, hours = 0, minutes = 0, seconds = 0) -> None:
    db = get_db()
    cur = db.cursor()
    
    if tableName == "stopwatch":
        checking_database = cur.execute('SELECT * FROM stopwatch WHERE id LIKE(?)', (id, )).fetchone()

        if checking_database != None:
            cur.execute('''UPDATE stopwatch SET hours = (?), minutes = (?), seconds = (?)
            WHERE id = (?)''', (hours, minutes, seconds, id))
        else:
            cur.execute('INSERT INTO stopwatch VALUES(?, ?, ?, ?)', (id, hours, minutes, seconds))

    elif tableName == "pomodoro":
        checking_database = cur.execute('SELECT * FROM pomodoro WHERE id LIKE(?)', (id, )).fetchone()

        if checking_database != None:
            cur.execute('''UPDATE pomodoro SET hours = (?), minutes = (?), seconds = (?)
            WHERE id = (?)''', (hours, minutes, seconds, id))
        else:
            cur.execute('INSERT INTO pomodoro VALUES(?, ?, ?, ?)', (id, hours, minutes, seconds))
    else:
        raise ValueError(f'This {tableName} table doesn\'t exist in database')
    
    db.commit()
    cur.close()


def get_value_db(tableName, id):
    db = get_db()
    cur = db.cursor()
    if tableName == "stopwatch":
        cur.execute('SELECT * FROM stopwatch WHERE id LIKE (?)', (id, ))
    elif tableName == "pomodoro":
        cur.execute('SELECT * FROM pomodoro WHERE id LIKE (?)', (id, ))
    else:
        raise ValueError(f'This {tableName} table doesn\'t exist in database')

    time = cur.fetchone()
    if time:
        return f'{small_time_value(time[1])}:{small_time_value(time[2])}:{small_time_value(time[3])}'
    else:
        return None