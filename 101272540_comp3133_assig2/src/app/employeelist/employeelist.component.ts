import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql/graphql.queries';
import { Router } from '@angular/router';

interface EmployeesData {
  getEmployees: any[];
}

@Component({
  selector: 'app-employeelist',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})

export class EmployeelistComponent {
  title : String = 'Employee List'
  employees: any;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void{
    const item = localStorage.getItem('loginStatus')
    
    if(item){
      this.getEmployees()
    }else{
      this.router.navigate(['/login']);
    }
  }

  addEmployee(str:any){
    console.log('add employee button is clicked')
    this.router.navigate(['/add-employee', str]);
  }

  viewEmployee(id:String){
    console.log('view employee is clicked')
    this.router.navigate(['/employee',id])
  }

  getRowBg(idx: number): String {
    return idx % 2 === 0 ? 'odd-row' : 'even-row';
  }

  getEmployees(): void {
    this.apollo.query<EmployeesData>({
      query: GET_EMPLOYEES
    }).subscribe(({ data, error }) => {
      if (data) {
        this.employees = data.getEmployees;
      }
      if (error) {
        console.error('Error fetching employees:', error);
      }
    });
  }

  deleteEmployee(id:String): void {
    console.log("delete button is clicked")
    this.apollo.mutate({
      mutation:DELETE_EMPLOYEE,
      variables:{
        eid: id
      },
      refetchQueries:[{
        query: GET_EMPLOYEES
      }]
    }).subscribe(({data}: any) => {
      console.log(data)
    })

    window.location.reload()
  }

}