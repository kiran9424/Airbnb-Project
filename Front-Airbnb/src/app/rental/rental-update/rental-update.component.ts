import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  locationSubject: Subject<any> = new Subject();
  rental: Rental;
  rentalCategories: string[] = Rental.CATEGORIES;
  constructor(private route: ActivatedRoute, private rentalService: RentalService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getRental(params['rentalId']);
    })
  }
  getRental(rentalId: string) {
    this.rentalService.getSingleRental(rentalId).subscribe((data: Rental) => {
      this.rental = data;
    })
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updateRental: Rental) => {
        this.rental = updateRental;
        if (rentalData.city || rentalData.street) {
          this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
        }
        this.toastr.success('Successfully updated your rental detail', 'Updated Successfully');

      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.errors[0].detail, 'Failed');
        this.getRental(rentalId);
      });

  }

  contBedroomassets(assetnum: number) {
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetnum;
  }
}
