from flask import Flask

def create_app():
    app = Flask(__name__)

    #blueprint registration
    from . import main as main_blueprint
    
    app.register_blueprint(main_blueprint.main)

    return app