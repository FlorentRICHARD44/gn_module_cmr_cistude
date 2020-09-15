import sys
from flask import Blueprint, request, abort
from geonature.utils.utilssqlalchemy import json_resp
from .models import TStudyArea, TCampaign
from .repositories import StudyAreaRepository, CampaignRepository


blueprint = Blueprint('cmr_cistude', __name__)

@blueprint.route('/test', methods=['GET'])
def test():
    return 'It works'

@blueprint.route('/test2', methods=['GET'])
@json_resp
def test2():
    return {"foo":"bar","test":'It works'}


@blueprint.route('/studyareas', methods=['GET'])
@json_resp
def get_all_study_areas():
    repo = StudyAreaRepository(TStudyArea)
    return repo.get_all()

@blueprint.route('/studyarea/<int:id_area>', methods=['GET'])
@json_resp
def get_one_study_area(id_area):
    repo = StudyAreaRepository(TStudyArea)
    return repo.get_one(id_area)

@blueprint.route('/studyarea', methods=['PUT'])
@json_resp
def save_study_area():
    repo = StudyAreaRepository(TStudyArea)
    study_area = repo.save(request.json)
    return study_area

@blueprint.route('/studyarea/<int:id_area>/campaigns', methods=['GET'])
@json_resp
def get_all_campaigns_by_area(id_area):
    campaign_repository = CampaignRepository(TCampaign)
    return campaign_repository.get_all_by_area(id_area)

@blueprint.route('/campaigns', methods=['GET'])
@json_resp
def get_all_campaigns():
    try:
        campaign_repository = CampaignRepository(TCampaign)
        return campaign_repository.get_all()
    except Exception as e:
        return {"error": str(e)}

@blueprint.route('/campaign/<int:id_campaign>', methods=['GET'])
@json_resp
def get_one_campaign(id_campaign):
    campaign_repository = CampaignRepository(TCampaign)
    campaign = campaign_repository.get_one(id_campaign)
    if campaign is None:
        abort(404)
    else:
        return campaign

@blueprint.route('/campaign', methods=['PUT'])
def save_campaign():
    try:
        campaign_repository = CampaignRepository(TCampaign)
        campaign = campaign_repository.save(request.json)
        return campaign
    except Exception as e:
        return {"error": str(e)}
