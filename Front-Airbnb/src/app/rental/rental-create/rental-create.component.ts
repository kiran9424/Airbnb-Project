import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalCategory = Rental.CATEGORIES;
  errors: any[]= [];
  constructor(private rentalService: RentalService,private route:Router) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental:Rental) => {
        this.route.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      });


  }

  changeImageHandler() {
    this.newRental.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRblnRoHVM2yvI7aJHgHPx-dFtqUKRSP1r6Oxx4fcq16NbGEEcz";
  }

}
