import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyNeedsPage } from './daily-needs.page';

describe('DailyNeedsPage', () => {
  let component: DailyNeedsPage;
  let fixture: ComponentFixture<DailyNeedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyNeedsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyNeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
