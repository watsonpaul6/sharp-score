import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
  QueryFn,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

export type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
export type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === "string" ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === "string" ? this.afs.doc<T>(ref) : ref;
  }

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(map((doc) => doc.payload.data() as T));
  }
  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn)
      .valueChanges()
  }
  // col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
  //   return this.col(ref, queryFn)
  //     .snapshotChanges()
  //     .pipe(map((docs) => docs.map((a) => a.payload.doc.data()) as T[]));
  // }
}
