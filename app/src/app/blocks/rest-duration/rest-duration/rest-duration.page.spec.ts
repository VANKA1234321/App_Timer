import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestDurationPage } from './rest-duration.page';

describe('RestDurationPage', () => {
  let component: RestDurationPage;
  let fixture: ComponentFixture<RestDurationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestDurationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestDurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
