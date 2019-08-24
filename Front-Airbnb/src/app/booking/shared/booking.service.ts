import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(private http: HttpClient) { }

    createBooking(booking: Booking): Observable<any> {
        return this.http.post('/api/v1/booking', booking);
    }

}
