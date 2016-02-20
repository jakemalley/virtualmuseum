# __init__.py
# Virtual Museum

# Flask Imports
from flask import Flask
# Imports
import os

# Create flask application object.
app = Flask(__name__)

# Load configuration.
CONFIGURATION_FILE = os.path.abspath('virtual_museum.conf')
try:
    app.config.from_pyfile(CONFIGURATION_FILE, silent=False)
except IOError:
    # Failed to load from the CONFIGURATION_FILE.
    print(' * Failed to load configuration from %s' %CONFIGURATION_FILE)
except Exception as e:
    print(' * Failed to load configuration file, unknown error: %s' %e)

# Import Blueprints
from virtualmuseum.home.views import home_blueprint

# Register Blueprints
app.register_blueprint(home_blueprint)