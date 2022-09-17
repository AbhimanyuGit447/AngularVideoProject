import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email : '',
    password : ''
  }

  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Logging In in Process'
  inSubmission = false;

  constructor(private auth : AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login(){
    this.showAlert = true;
    this.alertMsg = 'Logging In in Process'
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email as string, this.credentials.password as string);
      
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Login Request Failed, Please try again later!'
      return;
    }
    this.alertColor = 'green';
    this.alertMsg = 'Login SuccessFull'
 
  }

}
