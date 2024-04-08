import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { EDIT_EMPLOYEE, ADD_EMPLOYEE, GET_EMPLOYEE_BY_ID, GET_EMPLOYEES } from '../graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [FormsModule,JsonPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent {

  title: String = '';
  eid: any;
  empForm: FormGroup;

  constructor(private route:ActivatedRoute, private apollo:Apollo, private router: Router){
    this.empForm = new FormGroup({
      firstname: new FormControl("",[Validators.required]),
      lastname: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
    })
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.eid = params.get('id')

      if (this.eid === 'add'){
        this.title = "Add"
      }else{
        this.title = "Edit"
        this.fetchEmployeeDetails(this.eid)
      }
    })
  }

  navigateToList(){
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  onSubmit(){
    if (this.title === 'Add'){
      this.addStudent()
    }else{
      this.editStudent(this.eid)
    }
  }

  addStudent(){
    console.log('add student')
    console.log(this.empForm.value)
    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: {
        firstName: this.empForm.value.firstname,
        lastName: this.empForm.value.lastname,
        email: this.empForm.value.email
      },
      refetchQueries:[{
        query: GET_EMPLOYEES
      }]
    }).subscribe({
      next: (result) => {
        const { data }: any = result;
        console.log(data);
        this.empForm.reset();
      }
    })
    this.navigateToList();
  }

  editStudent(id: String){
    console.log('add student')
    console.log(this.empForm.value)
    this.apollo.mutate({
      mutation: EDIT_EMPLOYEE,
      variables: {
        eid: id,
        firstName: this.empForm.value.firstname,
        lastName: this.empForm.value.lastname,
        email: this.empForm.value.email
      },
      refetchQueries:[{
        query: GET_EMPLOYEES
      }]
    }).subscribe(({data}:any) =>{
      console.log(data)
      this.empForm.reset()
    })
    this.navigateToList();
  }

  fetchEmployeeDetails(id: String): any{
    this.apollo.mutate({
      mutation: GET_EMPLOYEE_BY_ID,
      variables: {
        eid: id
      }
    }).subscribe(({data}:any) =>{
      this.empForm.patchValue({
        firstname: data.getEmployeeById.first_name,
        lastname: data.getEmployeeById.last_name,
        email: data.getEmployeeById.email
      })
    })
  }
}
