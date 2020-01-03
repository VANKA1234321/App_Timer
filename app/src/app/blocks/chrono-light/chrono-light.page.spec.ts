import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChronoLightPage } from './chrono-light.page';

describe('ChronoLightPage', () => {
  let component: ChronoLightPage;
  let fixture: ComponentFixture<ChronoLightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoLightPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChronoLightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
