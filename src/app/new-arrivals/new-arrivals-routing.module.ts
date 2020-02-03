import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewArrivalsPage } from './new-arrivals.page';

const routes: Routes = [
  {
    path: '',
    component: NewArrivalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewArrivalsPageRoutingModule {}
