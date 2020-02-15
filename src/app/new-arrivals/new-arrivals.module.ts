import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewArrivalsPageRoutingModule } from './new-arrivals-routing.module';

import { NewArrivalsPage } from './new-arrivals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewArrivalsPageRoutingModule
  ],
  declarations: [NewArrivalsPage]
})
export class NewArrivalsPageModule {}
