import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BasilPage } from './basil.page';

describe('BasilPage', () => {
  let component: BasilPage;
  let fixture: ComponentFixture<BasilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BasilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
