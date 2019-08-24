import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { CommonModule } from '@angular/common';
import { RentalService } from './shared/rental.service';
import { Routes, RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipe/uppercase.pipe';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/auth.gaurd';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { HelperService } from './shared/helper.service';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking/shared/booking.service';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental-update/rental-update.component';
import { EditableModule } from '../common/components/editable/editable.module';
import { RentalGaurd } from '../auth/rental-guard.component';
import { PaymentModule } from '../payment/payment.module';




const route: Routes = [
    {
        path: 'rentals', component: RentalComponent,
        children: [
            { path: '', component: RentalListComponent },
            { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
            { path: ':rentalId', component: RentalDetailComponent },
            { path: ':city/homes', component: RentalSearchComponent },
            { path: ':rentalId/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGaurd] }

        ]
    }
]
@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        RentalDetailBookingComponent,
        UppercasePipe,
        RentalSearchComponent,
        RentalCreateComponent,
        RentalUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule,
        EditableModule,
        PaymentModule 
    ],
    providers: [
        RentalService,
        AuthGuard,
        HelperService,
        BookingService,
        RentalGaurd
    ]
})
export class RentalModule {

}