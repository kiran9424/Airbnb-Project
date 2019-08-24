import { NgModule } from "@angular/core";
import {PaymentComponent} from './payment.component';
import { CommonModule } from "@angular/common";
import { PaymentService } from './shared/payment.service';


@NgModule({
    imports:[
       CommonModule 
    ],
    declarations:[
        PaymentComponent
    ],
    providers:[
        PaymentService
    ],
    exports:[
        PaymentComponent
    ]
})
export class PaymentModule{}