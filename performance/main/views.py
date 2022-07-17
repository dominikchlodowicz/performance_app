from flask import render_template, request

from . import main
@main.route('/')
def index():
     return render_template('timer.html')

@main.route('/timer', methods=["GET", "POST"])
def timer():
     if request.method == 'POST':
          if request.form['reset'] == 'reset':
               value = request.form['time']
               print(value)
               return value
     elif request.method == 'GET':
          return render_template('timer.html')
