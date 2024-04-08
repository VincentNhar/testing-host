import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component'
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    EmployeelistComponent, 
    AddemployeeComponent, 
    EmployeedetailComponent, 
    LoginComponent,
    SignupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '101272540_comp3133_assig2';

  isLoggedIn = false;

  ngOnInit(){
    this.isLoggedIn = (localStorage.getItem('loginStatus')) ? true : false
  }

  handleLogout(){
    localStorage.removeItem('loginStatus')
  }
}
