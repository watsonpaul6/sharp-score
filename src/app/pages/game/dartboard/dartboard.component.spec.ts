import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DartboardComponent } from './dartboard.component';

describe('DartboardComponent', () => {
  let component: DartboardComponent;
  let fixture: ComponentFixture<DartboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DartboardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DartboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
