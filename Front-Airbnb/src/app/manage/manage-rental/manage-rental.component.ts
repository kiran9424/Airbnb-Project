import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { Rental } from 'src/app/rental/shared/rental.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  manageRentals: Rental[];
  rentalDeleteIndex: number;
  constructor(private manageService: ManageService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.manageService.getManageRentals().subscribe(
      (newManageRentals: Rental[]) => {
        this.manageRentals = newManageRentals;

      },
      () => {

      })
  }

  deleteRental(id) {
    this.manageService.deleteRenatl(id).subscribe(
      () => {
        this.manageRentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined; this.toastr.success('Successfully deleted your rental', 'Deleted Successfully');
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.errors[0].detail, 'Failed');
      })
  }

}
