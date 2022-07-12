from ensurepip import bootstrap
from flask import Flask
from flask_bootstrap import Bootstrap

bootstrap = Bootstrap()

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')

    #blueprint registration
    from performance.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    bootstrap.init_app(app)

    return app