import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditUserprofilePage } from './edit-userprofile.page';

describe('EditUserprofilePage', () => {
  let component: EditUserprofilePage;
  let fixture: ComponentFixture<EditUserprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
