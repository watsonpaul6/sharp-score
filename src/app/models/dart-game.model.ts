import { DartGameRound } from './dart-game-round.model';
import { DocumentReference } from '@angular/fire/firestore';

export class DartGame {
  playersUserIds: DocumentReference[] = [];
  winnerUserId: string;
  gameOptionsName: string;
  rounds: DartGameRound[] = [];
  datePlayed: firebase.firestore.Timestamp;
}
