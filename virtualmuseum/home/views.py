# views.py
# Virtual Museum
# Views for the home blueprint.

# Flask Imports
from flask import Blueprint
from flask import render_template

home_blueprint = Blueprint('home', __name__)

@home_blueprint.route('/')
def index():
    """
    Application index.
    """
    
    return render_template('home/index.html')