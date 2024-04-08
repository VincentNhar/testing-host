import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { LOGIN } from '../graphql/graphql.queries';

interface UserData{
  login:boolean
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  loginStatus: boolean = false;

  constructor(private apollo:Apollo, private router: Router){
    this.loginForm = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    })
  }

  ngOnInit(){
    const s = localStorage.getItem('loginStatus');

    console.log(s)
    if(s == 'true'){
      this.router.navigate(['/']);
    }
  }

  verifyLogin(){
    this.apollo.query<UserData>({
      query: LOGIN,
      variables:{
        username:this.loginForm.value.username,
        password:this.loginForm.value.password
      }
    }).subscribe(({ data }) => {
      this.loginStatus = data.login
      console.log(this.loginStatus)
      if(this.loginStatus === true){
        localStorage.setItem('loginStatus', 'true')
        window.location.reload()
      }else{
        console.log(this.loginForm.controls['password'].reset())
        alert("Login Unsuccessful !")
      }
    });
  }
}
