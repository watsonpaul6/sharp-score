import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetupGametypeComponent } from './setup-gametype.component';

describe('SetupGametypeComponent', () => {
  let component: SetupGametypeComponent;
  let fixture: ComponentFixture<SetupGametypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupGametypeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetupGametypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
