import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetupGamePage } from './setup-game.page';

describe('SetupGamePage', () => {
  let component: SetupGamePage;
  let fixture: ComponentFixture<SetupGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetupGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
