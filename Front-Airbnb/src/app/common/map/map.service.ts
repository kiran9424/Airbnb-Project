import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable({ providedIn: 'root' })
export class MapService {

    private geocode;
    private locationCache: any = {};
    constructor(private camelizePipe: CamelizePipe) {

    }

    private camelize(value: string): string {
        return this.camelizePipe.transform(value);
    }

    private isLocationCached(location): boolean{
        return this.locationCache[this.camelize(location)];
    }
    private cacheLocation(location: string, coordinates: any) {
        const camelizedLocation = this.camelizePipe.transform(location);
        this.locationCache[camelizedLocation] = coordinates;
    }

    geocodeLocation(location: string): Observable<any> {
        this.geocode = (<any>window).google.maps.Geocoder();

        return new Observable((data) => {
            if (this.isLocationCached(location)) {
                data.next(this.locationCache[this.camelize(location)])
            } else {
                this.geocode.geocode({ address: location }, (result, status) => {
                    if (status === 'OK') {
                        const geometry = result[0].geometry.location;
                        const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
                        this.cacheLocation(location, coordinates);
                        data.next(coordinates);
                    } else {
                        data.error('Location not found');
                    }
                });

            }
        })

    }
}