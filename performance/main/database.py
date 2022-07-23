from sqlite3 import connect
from flask import current_app, g
from . import main
from config import config

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect(config["database"])
    return db

def insert_time(id, hours = 0, minutes = 0, seconds = 0) -> None:
    db = get_db()
    cur = db.cursor()
    checking_database = cur.execute('SELECT * FROM time WHERE ID LIKE(?)', (id,)).fetchone()
    if checking_database != None:
        cur.execute('''UPDATE time SET hours = (?), minutes = (?), seconds = (?)
        WHERE ID = (?)''', (hours, minutes, seconds, id))
    else:
        cur.execute('INSERT INTO time VALUES(?, ?, ?, ?)', (str(id), hours, minutes, seconds))
    db.commit()
    cur.close()

def small_time_value(value):
    val = int(value)
    if val < 10:
        return f'0{val}'
    else:
        return value

def get_time(id):
    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM time WHERE ID LIKE (?)', (id,))
    time = cur.fetchone()
    if time:
        return f'{small_time_value(time[1])}:{small_time_value(time[2])}:{small_time_value(time[3])}'
    else:
        return None