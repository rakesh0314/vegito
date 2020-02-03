import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffersPagePage } from './offers-page.page';

describe('OffersPagePage', () => {
  let component: OffersPagePage;
  let fixture: ComponentFixture<OffersPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
