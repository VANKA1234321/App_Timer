import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IFastPage } from './i-fast.page';

describe('IFastPage', () => {
  let component: IFastPage;
  let fixture: ComponentFixture<IFastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IFastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IFastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
