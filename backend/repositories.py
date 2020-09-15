from geonature.utils.env import DB
from .models import TStudyArea, TCampaign, CorCampaignOperators
from pypnusershub.db.models import User

class StudyAreaRepository:
    """
    Repository to access the study area data
    """
    def __init__(self, model):
        self.model = model

    def get_all(self):
        q = DB.session.query(TStudyArea)
        return [sa.as_dict() for sa in q.all()]

    def get_one(self, id_area):
        q = DB.session.query(TStudyArea).filter(TStudyArea.id_area == id_area)
        return q.one().as_dict()

    def save(self, study_area):
        if study_area is None:
            raise GeonatureError("Missing data to save study area")
        else:
            study_area = TStudyArea(**study_area)
            if study_area.id_area:
                DB.session.merge(study_area)
            else:
                DB.session.add(study_area)
            DB.session.commit()
        return study_area.as_dict()

class CampaignRepository:
    """
    Repository to access the Campaign data
    """
    def __init__(self, model):
        self.model = model
    
    def _campaigns_to_dict(self, data):
        result = {}
        for campaign, user in data:
            campaign_data = campaign.as_dict()
            if not campaign_data['id_campaign'] in result:
                campaign_data['operators'] = [user.as_dict()] if user is not None else []
                result[campaign_data['id_campaign']] = campaign_data
            else:
                if user:
                    result[campaign_data['id_campaign']]['operators'].append(user.as_dict())
        return [v for v in result.values()]

    def get_all(self):
        q = DB.session.query(TCampaign,User).join(CorCampaignOperators, TCampaign.id_campaign == CorCampaignOperators.id_campaign, isouter=True).join(User, CorCampaignOperators.id_operator == User.id_role, isouter=True)
        return self._campaigns_to_dict(q.all())

    def get_all_by_area(self, id_area):
        q = DB.session.query(TCampaign).filter(TCampaign.id_area == id_area)
        return [c.as_dict() for c in q.all()]

    def get_one(self, id_campaign):
        q = DB.session.query(TCampaign).filter(TCampaign.id_campaign == id_campaign)
        c = q.one_or_none()
        return c.as_dict() if c else None

    def save(self, campaign):
        if campaign is not None:
            campaign = TCampaign(**campaign)
            if not campaign.id_campaign:
                DB.session.add(campaign)
            else:
                DB.session.merge(campaign)
            DB.session.commit()
            return campaign.as_dict()
        else:
            raise GeonatureError("Missing data to create campaign")
