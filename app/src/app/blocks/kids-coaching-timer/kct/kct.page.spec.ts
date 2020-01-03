import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KCTPage } from './kct.page';

describe('KCTPage', () => {
  let component: KCTPage;
  let fixture: ComponentFixture<KCTPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KCTPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KCTPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
