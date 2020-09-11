import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "@geonature_config/app.config";
import { ModuleConfig } from "../module.config";


@Injectable({
    providedIn: "root"
})
export class CmrService {
    constructor(private _api: HttpClient) {}

    getAllCampaigns() {
        return this._api.get<any>(`${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/campaigns`);
    }

    saveCampaign(form: any) {
        return this._api.put<any>(`${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/campaign`, form);
    }

    getAllStudyAreas() {
        return this._api.get<any>(`${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/studyareas`);
    }
    getOneStudyArea(id) {
        return this._api.get<any>(`${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/studyarea/${id}`);
    }

    saveStudyArea(form: any) {
        return this._api.put<any>(`${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/studyarea`, form);
    }

}