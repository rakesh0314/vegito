import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawMoneyPage } from './withdraw-money.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawMoneyPageRoutingModule {}
