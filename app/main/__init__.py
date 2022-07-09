from flask import Blueprint

main = Blueprint('main', __name__)

#associatiing views and errors with blueprint
from . import views, errors