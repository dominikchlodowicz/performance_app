from ensurepip import bootstrap
from flask import Flask
from flask_bootstrap import Bootstrap
from config import config

bootstrap = Bootstrap()

def create_app(config_name):
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    #blueprint registration
    from performance.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    bootstrap.init_app(app)

    return app