import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPagePageRoutingModule } from './offers-page-routing.module';

import { OffersPagePage } from './offers-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersPagePageRoutingModule
  ],
  declarations: [OffersPagePage]
})
export class OffersPagePageModule {}
