import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import "firebase/auth";
import { NewUserModalComponent, NewUserModalData } from "src/app/core/components/new-user-modal.component";
import { ModalController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { UserInfo } from "src/app/models/user-info.model";
import { EditUserModalComponent, EditUserModalData } from "../../components/header/edit-user-modal.component";
import { environment } from "src/environments/environment";

// @Injectable({
//   providedIn: "root",
// })
@Injectable()
export class UserAuthService {
  private userInfoSubject = new BehaviorSubject<UserInfo>(null);
  public get userInfo$() {
    return this.userInfoSubject.asObservable();
  }
  public get userInfoValue() {
    return this.userInfoSubject.value;
  }

  constructor(
    private authFire: AngularFireAuth,
    private firestore: AngularFirestore,
    private modalController: ModalController
  ) {
    authFire.user.subscribe(async (user) => {
      if (user) {
        let userDoc = (
          await firestore.collection(environment.collections.users).doc(user.uid).get().toPromise()
        ).data();
        let displayName = null;
        if (userDoc) {
          displayName = userDoc.displayName;
        }
        if (displayName === null) {
          displayName = await this.showNewUserInfoModal(user.uid, user.displayName);
        }

        this.updateUserInfo(displayName, user);
      }
    });
  }

  async signInWithGoogle() {
    await this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    this.authFire.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    await this.authFire.signOut();
    this.userInfoSubject.next(null);
  }

  async editUserDetails() {
    let userInfoModal = await this.modalController.create({
      component: EditUserModalComponent,
      componentProps: { displayName: this.userInfoSubject.value.displayName },
      backdropDismiss: false,
    });
    await userInfoModal.present();
    const modalResult = await userInfoModal.onDidDismiss();
    const data: EditUserModalData = modalResult.data;
    if (data) {
      this.updateUserInfo(data.displayName, this.userInfoSubject.value.userCreds);
      await this.firestore
        .collection(environment.collections.users)
        .doc(`${this.userInfoSubject.value.userCreds.uid}`)
        .update({ displayName: `${data.displayName}` });
    }
  }

  async registerWithEmailPassword(email: string, password: string) {
    let userCreds = await this.authFire.createUserWithEmailAndPassword(email, password);
  }

  private async showNewUserInfoModal(uid: string, defaultDisplayName: string) {
    let userInfoModal = await this.modalController.create({
      component: NewUserModalComponent,
      backdropDismiss: false,
      componentProps: { displayName: defaultDisplayName?.split(" ")[0] },
    });
    await userInfoModal.present();
    const modalResult = await userInfoModal.onDidDismiss();
    const data: NewUserModalData = modalResult.data;
    await this.firestore
      .collection(environment.collections.users)
      .doc(`${uid}`)
      .set({ displayName: `${data.displayName}` });
    return data.displayName;
  }

  private updateUserInfo(displayName: string, user: firebase.User) {
    let userInfo: UserInfo = {
      displayName,
      userCreds: user,
    };
    this.userInfoSubject.next(userInfo);
  }
}
