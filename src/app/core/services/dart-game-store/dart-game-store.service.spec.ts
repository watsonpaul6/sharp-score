import { TestBed } from '@angular/core/testing';

import { DartGameStoreService } from './dart-game-store.service';

describe('DartGameStoreService', () => {
  let service: DartGameStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DartGameStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
