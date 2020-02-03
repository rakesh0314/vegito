import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewArrivalsPage } from './new-arrivals.page';

describe('NewArrivalsPage', () => {
  let component: NewArrivalsPage;
  let fixture: ComponentFixture<NewArrivalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArrivalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewArrivalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
