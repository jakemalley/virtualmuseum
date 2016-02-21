# views.py
# Virtual Museum
# Views for the api blueprint.

# Flask Imports
from flask import Blueprint
from flask import jsonify
from flask import request
# Application Imports
from virtualmuseum import app
# Imports
import requests

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/museum')
@api_blueprint.route('/museum/search/<string:search>')
@api_blueprint.route('/museum/<int:page_number>')
def index(search=None, page_number=1):
    """
    API Index.
    """
    
    # http://www.vam.ac.uk/api/json/museumobject
    url = app.config['MUSEUM_API_ENDPOINT'] + "?limit=20" 
    if search:
        url = app.config['MUSEUM_API_ENDPOINT'] + '/search?limit=20&q='+search.replace(" ","+")
    # Calculate offset.
    offset = (page_number - 1) * 20
    url = url + "&offset=%d" %offset
    # Get the data from the api. 
    response = requests.get(url).json()
    # Add the IMAGE URIs to the response.
    for record in response["records"]:
        # Add a new field for the image_uri.
        record["fields"]["image_uri"] = app.config['MUSEUM_IMAGE_ENDPOINT']+record["fields"]["primary_image_id"][:6]+'/'+record["fields"]["primary_image_id"]+'_jpg_w.jpg'

    return jsonify(response)