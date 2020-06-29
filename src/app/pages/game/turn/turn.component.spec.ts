import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TurnComponent } from './turn.component';

describe('TurnComponent', () => {
  let component: TurnComponent;
  let fixture: ComponentFixture<TurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
