import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

  city: string;
  rentals: Rental[] = [];
  errors:any[]=[];
  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
   
    this.route.params.subscribe((params) => {
      this.city = params['city'];
      this.getCityByRental();
    })
  }

  getCityByRental() {
    this.errors =[];
    this.rentals =[];
    this.rentalService.getRentalByCity(this.city).subscribe(
      (rentalsCity: Rental[]) => {
        this.rentals = rentalsCity;
      },
      (errorResponse:any) => {
        this.errors = errorResponse.error.errors;
      })


  }
}
