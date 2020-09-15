
import { leafletDrawOption } from "@geonature_common/map/leaflet-draw.options";

import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class CmrMapService {
    constructor() {}

    getLeafletDrawOptionReadOnly() {
        leafletDrawOption.draw.circle = false;
        leafletDrawOption.draw.rectangle = false;
        leafletDrawOption.draw.marker = false;
        leafletDrawOption.draw.polyline = false;
        leafletDrawOption.draw.polygon = false;
        leafletDrawOption.edit.remove = false;
        return leafletDrawOption;
    }

    getLeafletDrawOptionDrawPolygon() {
        leafletDrawOption.draw.circle = false;
        leafletDrawOption.draw.rectangle = false;
        leafletDrawOption.draw.marker = false;
        leafletDrawOption.draw.polyline = false;
        leafletDrawOption.draw.polygon = true;
        leafletDrawOption.edit.remove = false;
        return leafletDrawOption;
    }
}