import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyNeedsPageRoutingModule } from './daily-needs-routing.module';

import { DailyNeedsPage } from './daily-needs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyNeedsPageRoutingModule
  ],
  declarations: [DailyNeedsPage]
})
export class DailyNeedsPageModule {}
