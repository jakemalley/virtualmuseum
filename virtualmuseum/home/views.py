# views.py
# Virtual Museum
# Views for the home blueprint.

# Flask Imports
from flask import Blueprint
from flask import render_template
from flask import request

home_blueprint = Blueprint('home', __name__)

@home_blueprint.route('/')
def index():
    """
    Application index.
    """
    # Search variable.
    search = None
    
    # Get http type args.
    if request.args.get("search"):
        search = request.args.get("search")
    
    return render_template('home/index.html', search=search)
    
@home_blueprint.route('/view')
def view():
    """
    View images.
    """
    
    return render_template('home/view.html')
