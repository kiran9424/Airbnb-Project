import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { state } from '@angular/animations';
import { RentalService } from '../rental/shared/rental.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RentalGaurd implements CanActivate {

    constructor(private rentalService: RentalService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const rentalId = route.params.rentalId;
        
        return this.rentalService.verifyUser(rentalId).pipe(
            map(() => {
                return true;
            }), catchError(() => {
                this.router.navigate(['/rentals']);
                return of(false);
            }));

    }

}