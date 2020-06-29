import { Injectable } from "@angular/core";
import { FirestoreService, DocPredicate } from "../firestore/firestore.service";
import { DartGame } from "src/app/models";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { firestore } from "firebase";
import { AngularFirestoreCollection, CollectionReference } from "@angular/fire/firestore";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: "root",
})
export class DartGameStoreService {
  private dartgamesCol: AngularFirestoreCollection<DartGame>;
  constructor(private firestore: FirestoreService) {
    this.dartgamesCol = this.firestore.col(environment.collections.dartgames);
    // let a = this.dartgamesCol.ref.where('gameOptionsName','==','301').get()
  }

  addGame(dartGame: DartGame) {
    dartGame.datePlayed = firestore.Timestamp.now();
    if (this.validateDartGame(dartGame)) {
      this.dartgamesCol.add(dartGame);
    }
  }

  getGames$(userUid?: DocPredicate<User>): Observable<DartGame[]> {
    const userDocRef = userUid ? this.firestore.doc(`/${environment.collections.users}/${userUid}`).ref : null;
    return userUid
      ? this.firestore.col$(environment.collections.dartgames, (ref) =>
          ref.where("playersUserIds", "array-contains", userDocRef).orderBy("datePlayed", "desc")
        )
      : this.firestore.col$(environment.collections.dartgames, (ref) => {
          return ref.orderBy("datePlayed", "desc");
        });
  }

  private validateDartGame(dartGame: DartGame) {
    return dartGame.playersUserIds.length > 0 && dartGame.winnerUserId && dartGame.rounds.length > 0;
  }
}
