import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;
  lat: number;
  lng: number;
  isPostionError: boolean = false;
  @Input() locationSubject: Subject<any>;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  getLocation(location){
    this.mapService.geocodeLocation(location).subscribe((data) => {
      this.lat = data.lat;
      this.lng = data.lng;
      this.ref.detectChanges();
    }, () => {
      this.isPostionError = true;
    });
  }
  mapReadyHandler() {
      this.getLocation(this.location);
  }
}
