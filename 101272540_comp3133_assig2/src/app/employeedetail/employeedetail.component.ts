import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../graphql/graphql.queries';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface EmployeesData {
  getEmployeeById: any;
}

@Component({
  selector: 'app-employeedetail',
  standalone: true,
  imports: [],
  templateUrl: './employeedetail.component.html',
  styleUrl: './employeedetail.component.css'
})


export class EmployeedetailComponent {
  title: String = "View Employee Details"

  employee: any;

  constructor(private route:ActivatedRoute, private apollo:Apollo, private router: Router){}

  ngOnInit(){
    const item = localStorage.getItem('loginStatus')
    
    if(item){
      this.route.paramMap.subscribe(params => {
        const id: any = params.get('id')
        this.getEmployee(id)
      })
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  getEmployee(id:String): void {
    this.apollo.query<EmployeesData>({
      query: GET_EMPLOYEE_BY_ID,
      variables:{
        eid:id
      }
    }).subscribe(({ data }) => {
      this.employee = data.getEmployeeById
    });
  }
}