import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { SIGNUP } from '../graphql/graphql.queries';

interface UserData{
  signup:any
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private apollo:Apollo, private router: Router){
    this.signupForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required])
    })
  }

  ngOnInit(){
    const s = localStorage.getItem('loginStatus');

    if(s == 'true'){
      this.router.navigate(['/']);
    }
  }

  register(){
    this.apollo.mutate<UserData>({
      mutation: SIGNUP,
      variables:{
        email:this.signupForm.value.email,
        username: this.generateUsername(this.signupForm.value.email),
        password:this.signupForm.value.password
      }
    }).subscribe(({ data }) => {
        if(data?.signup){
          localStorage.setItem('loginStatus', 'true')
          window.location.reload()
        }else{
          console.log('User already exists');
        }
    });
  }

  generateUsername(email:String): String{
    const parts = email.split('@');
    return parts[0];
  }

}
