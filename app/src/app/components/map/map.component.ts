import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { forkJoin } from 'rxjs';
import { MapService } from '../../services/map-service.service';
import { ILayer } from '../../types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService) {}

  private map: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589];

  lat: number = 51.505;
  lng: number = -0.09;

  zoomToLocation() {
    const newLat = parseFloat(this.lat.toString());
    const newLng = parseFloat(this.lng.toString());
    this.map.setView([newLat, newLng], 13);
  }

  private async fetchLayersData(callback) {
    forkJoin([
      this.mapService.getMapLayer('openStreet'),
      this.mapService.getMapLayer('esriWorld'),
      this.mapService.getMapLayer('gpw'),
      this.mapService.getMapLayer('urbanExpansion'),
    ]).subscribe((data) => callback(data));
  }

  private loadLayers = ([
    openStreetData,
    esriWorldData,
    gpwLayerData,
    urbanExpansionLayerData,
  ]: ILayer[]) => {
    //basemaps
    const openStreetMap = L.tileLayer(openStreetData.url, {
      ...openStreetData,
    }).addTo(this.map);
    const esriWorldImagery = L.tileLayer(esriWorldData.url, {
      ...esriWorldData,
    });

    //layers
    const gpwLayer = L.tileLayer.wms(gpwLayerData.url, {
      ...gpwLayerData,
    });
    const urbanExpansionLayer = L.tileLayer.wms(urbanExpansionLayerData.url, {
      ...urbanExpansionLayerData,
    });

    const basemaps = {
      'Open Steet Map': openStreetMap,
      'Esri World Imagery': esriWorldImagery,
    };
    const overlays = {
      'GPWv4 Population Density': gpwLayer,
      'Urban Expansion to 2030': urbanExpansionLayer,
    };

    L.control
      .layers(basemaps, overlays, {
        collapsed: false,
      })
      .addTo(this.map);
  };

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12,
    });

    this.fetchLayersData(this.loadLayers);
  }

  async ngOnInit() {
    this.initMap();
  }
}
