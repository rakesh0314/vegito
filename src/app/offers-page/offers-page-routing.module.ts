import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffersPagePage } from './offers-page.page';

const routes: Routes = [
  {
    path: '',
    component: OffersPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersPagePageRoutingModule {}
