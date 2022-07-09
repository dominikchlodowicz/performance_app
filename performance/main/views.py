from flask import render_template
from performance.timer_functionality.timer import Timer

from . import main
@main.route('/')
def index():
     return render_template('timer.html', time=Timer.get_time())