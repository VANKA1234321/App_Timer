//	Angular
import	{ Component } from '@angular/core';
import	{ FormControl, FormGroup, Validators } from '@angular/forms';

//	Ionic
import	{
	 IonicPage,
	 NavController,
	 NavParams
}	from 'ionic-angular';

//	Firebase
import	{ AngularFireAuth } from 'angularfire2/auth';
import	{ FirebaseError, User } from 'firebase/app';

//	Providers
import	{ NotificationProvider } from '../../providers';

@IonicPage({
	 name: 'login'
})
@Component({
	 templateUrl: 'login.html'
})
export	class LoginPage {
	 private _history: string;
	 public loginForm: FormGroup;
	 constructor(
	   private _afAuth: AngularFireAuth,
	   private _navCtrl: NavController,
	   private _notifyPvd: NotificationProvider,
	   private _params: NavParams
	 ) {
	   this._history = this._params.get('history');
	   this.loginForm = new FormGroup({
	     email: new FormControl('', [Validators.required, Validators.email]),
	     password: new FormControl('', Validators.required)
	   });
	 }

	 public forgotPassword(): void {
	   this._navCtrl.setRoot('forgot-password', {
	     history: this._history
	   })
	 }

	 public login(): void {
	   this._notifyPvd.showLoading();
	   this._afAuth.auth.signInWithEmailAndPassword(
	     this.loginForm.get('email').value.trim(),
	     this.loginForm.get('password').value.trim()
	   )
	     .then((user: User) => {
	       this._notifyPvd.closeLoading();
	       if (this._history) {
	         this._navCtrl.setRoot(this._history);
	       } else {
	         this._navCtrl.setRoot('timer');
	       }
	     }).catch((err: FirebaseError) => {
	       this._notifyPvd.closeLoading();
	       this._notifyPvd.showError(err.message);
	     });
	 }

	 public register(): void {
	   this._navCtrl.setRoot('registration', {
	     history: this._history
	   })
	 }
}
