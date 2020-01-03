import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotifiyPage } from './notifiy.page';

describe('NotifiyPage', () => {
  let component: NotifiyPage;
  let fixture: ComponentFixture<NotifiyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifiyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifiyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
