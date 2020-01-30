import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserprofilePageRoutingModule } from './edit-userprofile-routing.module';

import { EditUserprofilePage } from './edit-userprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserprofilePageRoutingModule
  ],
  declarations: [EditUserprofilePage]
})
export class EditUserprofilePageModule {}
