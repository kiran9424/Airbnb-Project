import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MapService } from './map.service';
import { CommonModule } from '@angular/common';
import { NgPipesModule, CamelizePipe } from 'ngx-pipes';


@NgModule({
    declarations: [
        MapComponent

    ],
    exports: [
        MapComponent
    ],
    imports: [
        CommonModule,
        NgPipesModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAZudHJTmnYJXOzKeK-K1wNicmt8qrElOM'
        })
    ],
    providers: [
        MapService,
        CamelizePipe
    ],

})
export class MapModule { }
