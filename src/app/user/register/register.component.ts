import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AuthService } from 'src/app/services/auth.service'
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from "../validators/register-validators";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService) { }

  inSubmission = false;

  showAlert = false;
  alertMsg = 'Please wait! your account is being created.'
  alertColor = 'blue';

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required])
  age = new FormControl(null, [Validators.required])
  password = new FormControl('', Validators.required)
  confirm_password = new FormControl('', [Validators.required])
  phone_number = new FormControl('')

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phone_number: this.phone_number
  }, [RegisterValidators.match('password', 'confirm_password')])


  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! your account is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true;

    try {
      await this.auth.createUser(this.registerForm.value as IUser)

    } catch (error) {
      console.log(error);
      this.alertMsg = 'An unexpected error occured. Please try again';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;

    }

    this.alertMsg = 'Success! your account has been created';
    this.alertColor = 'green';
  }

}


