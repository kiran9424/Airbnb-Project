import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManageService {

    constructor(private http: HttpClient) { }

    getManageRentals(): Observable<any> {
        return this.http.get('/api/v1/rentals/manage');
    }

    getManageBookings(): Observable<any> {
        return this.http.get('/api/v1/booking/manage');
    }

    deleteRenatl(id):Observable<any>{
        return this.http.delete(`/api/v1/rentals/${id}`)
    }
}