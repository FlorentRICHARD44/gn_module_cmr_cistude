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
        q = DB.session.query(TCampaign,User).join(CorCampaignOperators, TCampaign.id_campaign == CorCampaignOperators.id_campaign, isouter=True).join(User, CorCampaignOperators.id_operator == User.id_role, isouter=True).filter(TCampaign.id_campaign == id_campaign)
        return self._campaigns_to_dict(q.all())[0]

    def save(self, campaign):
        if campaign is not None:
            new_op = []
            for op in campaign['operators']:
                if op is not None:
                    op_found = DB.session.query(User).filter(User.id_role == op['id_role']).first()
                    if op_found:
                        new_op.append(op_found)
            
            try:
                campaign['operators'] = []
                campaign = TCampaign(**campaign)
                if not campaign.id_campaign:
                    DB.session.add(campaign)
                else:
                    DB.session.merge(campaign)
                    old_corops = DB.session.query(CorCampaignOperators).filter(CorCampaignOperators.id_campaign == campaign.id_campaign).delete()
                DB.session.commit()
            except Exception as e:
                raise Exception('error in part 2: ' + str(e))
            # update operators list
            try:
                for op in new_op:
                    campaign.operators.append(op)
                DB.session.merge(campaign)
                DB.session.commit()
                return self.get_one(campaign.id_campaign)
            except Exception as e:
                raise Exception('error in part 3: '+ str(e))
        else:
            raise GeonatureError("Missing data to create campaign")
