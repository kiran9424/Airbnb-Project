import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { Booking } from 'src/app/booking/shared/booking.model';
import { PaymentService } from 'src/app/payment/shared/payment.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  manageBookings: Booking[];
  payments: any[] = [];
  constructor(private manageService: ManageService,
               private paymentService: PaymentService) { }

  ngOnInit() {
    this.getPendingPayments();
    this.manageService.getManageBookings().subscribe(

      (newBookings: Booking[]) => {
        this.manageBookings = newBookings;
      },
      () => {

      });
       
  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe(
      (payments: any) => {
        this.payments = payments;
      })
  }

}
