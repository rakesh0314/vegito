import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyNeedsPage } from './daily-needs.page';

const routes: Routes = [
  {
    path: '',
    component: DailyNeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyNeedsPageRoutingModule {}
