import os

try:
    f = open('./secret/SECRET_KEY')
    secret_key = f.read()
    f.close()
except Exception as e:
    print('SECRET_KEY will be set form an enviromental variable')

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or "test_secret_key"

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

config = {
    'development': DevelopmentConfig,
    
    'default': DevelopmentConfig,
    'database': './database/main.db'
}