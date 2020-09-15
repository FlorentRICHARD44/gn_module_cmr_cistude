-- NEW SCHEMA for the module "cmr_cistude"
CREATE SCHEMA gn_cmr_cistude;

-- TABLE to store the study area
CREATE TABLE gn_cmr_cistude.t_study_area (
    id_area serial NOT NULL,
    area_name character varying(50), -- example: "Etang de Ravoux"
    city_name character varying(50), -- example: "Succieu"
    postal_code character varying(10), -- example "38300"
    polygon_name character varying(150), -- composed of area_name + city_name + postal_code. example: "Etang_de_Ravoux_Succieu_38300"
    geom geometry(MultiPolygon,4326),
    description text,
    CONSTRAINT pk_t_study_area PRIMARY KEY (id_area)
);

-- TABLE to store a campaign. each campaign is linked to a single study area
CREATE TABLE gn_cmr_cistude.t_campaign (
    id_campaign serial NOT NULL,
    name character varying (255), -- composed of area t_study_area.area_name + session + year
    description text,
    year integer, -- current year
    session integer, -- Increment each new campaign on area, whatever the year
    operators text, -- Full name separated by comma if several
    id_area integer NOT NULL, -- link to study area
    CONSTRAINT t_campaign_pk PRIMARY KEY (id_campaign),
    CONSTRAINT fk_t_campaign_id_area FOREIGN KEY (id_area) REFERENCES gn_cmr_cistude.t_study_area(id_area)
);


CREATE TABLE gn_cmr_cistude.cor_campaign_operators (
    id_campaign integer NOT NULL,
    id_operator integer NOT NULL,
    CONSTRAINT pk_cor_campaign_operators PRIMARY KEY (id_campaign, id_operator),
    CONSTRAINT fk_cor_campaign_operators_id_campaign FOREIGN KEY (id_campaign) REFERENCES gn_cmr_cistude.t_campaign(id_campaign),
    CONSTRAINT fk_cor_campaign_operators_id_operator FOREIGN KEY (id_operator) REFERENCES utilisateurs.t_roles(id_role)
);

