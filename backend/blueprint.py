from flask import Blueprint

blueprint = Blueprint('cmr_cistude', __name__)

@blueprint.route('/test', methods=['GET'])
def test():
    return 'It works'
