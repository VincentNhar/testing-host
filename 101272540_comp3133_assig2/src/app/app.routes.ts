import { Routes } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component'
import { AddemployeeComponent } from './addemployee/addemployee.component'
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    { path: '', component: EmployeelistComponent },
    { path: 'add-employee/:id', component: AddemployeeComponent },
    { path: 'employee/:id', component: EmployeedetailComponent},
    { path:'login', component: LoginComponent },
    { path:'signup', component: SignupComponent }
];
