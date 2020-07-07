import { TestBed } from '@angular/core/testing';

import { NewGameControllerService } from './new-game-controller.service';

describe('NewGameControllerService', () => {
  let service: NewGameControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewGameControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
