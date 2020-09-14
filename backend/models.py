from geonature.utils.utilssqlalchemy import serializable
from geonature.utils.env import DB
from geoalchemy2 import Geometry
from pypnusershub.db.models import User


SCHEMA_NAME = 'gn_cmr_cistude'
TABLE_CAMPAIGN = 't_campaign'

"""
Correspondance between Campaign(TCampaign) and an Operator(TRole)
"""

@serializable
class TStudyArea(DB.Model):
    """
    This class describes a study area for Capture/Marking/Recapture
    """
    __tablename__ = "t_study_area"
    __table_args__ = {"schema": SCHEMA_NAME}
    id_area = DB.Column(DB.Integer, primary_key=True)
    area_name = DB.Column(DB.Unicode)
    city_name = DB.Column(DB.Unicode)
    postal_code = DB.Column(DB.Unicode)
    polygon_name = DB.Column(DB.Unicode)
    geom = DB.Column(Geometry("GEOMETRY", 2154))
    description = DB.Column(DB.Unicode)
#    campaigns = DB.relationship("TCampaign", back_populates="study_area")

@serializable
class CorCampaignOperators(DB.Model):
    __tablename__ = "cor_campaign_operators"
    __table_args__ = {"schema": SCHEMA_NAME}
    id_campaign = DB.Column(DB.Integer, DB.ForeignKey(TABLE_CAMPAIGN + '.id_campaign'), primary_key=True)
    id_operator = DB.Column(DB.Integer, DB.ForeignKey(User.id_role), primary_key=True)

@serializable
class TCampaign(DB.Model): 
    """
    This class describe a campaign of Capture/Marking/Recapture.
    Each Campaign is directly linked to a Study Area
    """
    __tablename__ = 't_campaign'
    __table_args__ = {'schema': SCHEMA_NAME}
    id_campaign = DB.Column(DB.Integer, primary_key=True)
    description = DB.Column(DB.Unicode)
    name = DB.Column(DB.Unicode)
    year = DB.Column(DB.Integer)
    session = DB.Column(DB.Integer)
    id_area = DB.Column(DB.Integer, DB.ForeignKey(TStudyArea.id_area))
    #readonly_fields = ["id_campaign", "name"]
