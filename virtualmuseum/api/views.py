# views.py
# Virtual Museum
# Views for the api blueprint.

# Flask Imports
from flask import Blueprint
from flask import jsonify
# Application Imports
from virtualmuseum import app
# Imports
import requests

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/paintings')
@api_blueprint.route('/paintings/<int:page_number>')
def index(page_number=1):
    """
    API Index.
    """
    
    # http://www.vam.ac.uk/api/json/museumobject
    #search?objectnamesearch=painting
    endpoint = app.config['MUSEUM_API_ENDPOINT']
    # Calculate the offset. page 1 should have offset = 0, page 2 offset = 10 etc...
    offset = (page_number - 1) * 10
    url = endpoint+'search?objectnamesearch=painting&limit=10&offset=%d' %(offset)
    # Get the data from the api. 
    response = requests.get(url).json()
    # Add the IMAGE URIs to the response.
    for record in response["records"]:
        # Add a new field for the image_uri.
        record["fields"]["image_uri"] = app.config['MUSEUM_IMAGE_ENDPOINT']+record["fields"]["primary_image_id"][:6]+'/'+record["fields"]["primary_image_id"]+'.jpg'

    return jsonify(response)