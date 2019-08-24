import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.gaurd';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageComponent } from './manage.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageService } from './manage.service';
import { NgPipesModule } from 'ngx-pipes';
import { FormatDatePipe } from '../common/pipe/format.pipe';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';


const route: Routes = [
    {
        path: 'manage',
        component: ManageComponent,
        children: [
            { path: 'rentals', component: ManageRentalComponent },
            { path: 'bookings', component: ManageBookingComponent }
        ]
    }
]

@NgModule({
    declarations: [
        ManageComponent,
        ManageRentalComponent,
        ManageBookingComponent,
        FormatDatePipe,
        ManageRentalBookingComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        NgPipesModule

    ],
    providers: [
        AuthGuard,
        ManageService
    ]
})
export class ManageModule {

}