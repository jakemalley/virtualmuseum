# manage.py
# Virtual Museum

# Flask Imports
from flask.ext.script import Manager
from flask.ext.script import Server
# Application Imports
from virtualmuseum import app

# Create manager object.
manager = Manager(app)

# Ensure that the server host and port are set in config.
try:
    HOST = app.config['DEVELOPMENT_SERVER_HOST']
except KeyError:
    # The host was not set, default to 127.0.0.1.
    HOST = '127.0.0.1'
try:
    PORT = app.config['DEVELOPMENT_SERVER_PORT']
except KeyError:
    # The port was not set, default to 5000.
    PORT = 5000

# Create development server object.
server = Server(host=HOST,port=PORT)

# Add the runserver command to the manager.
manager.add_command('runserver', server)

if __name__ == '__main__':
    # Run the manager.
    manager.run()