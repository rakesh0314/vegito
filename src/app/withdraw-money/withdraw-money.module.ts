import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawMoneyPageRoutingModule } from './withdraw-money-routing.module';

import { WithdrawMoneyPage } from './withdraw-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawMoneyPageRoutingModule
  ],
  declarations: [WithdrawMoneyPage]
})
export class WithdrawMoneyPageModule {}
