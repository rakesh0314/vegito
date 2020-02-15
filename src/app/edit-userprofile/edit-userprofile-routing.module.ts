import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserprofilePage } from './edit-userprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserprofilePageRoutingModule {}
