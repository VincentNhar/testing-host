import {gql} from 'apollo-angular'

const GET_EMPLOYEES = gql`
    query GetEmployees {
        getEmployees {
            id
            first_name
            last_name
            email
        }
    }
`

const GET_EMPLOYEE_BY_ID = gql`
    query Query($eid: ID!) {
        getEmployeeById(eid: $eid) {
            id
            first_name
            last_name
            email
        }
    }
`

const ADD_EMPLOYEE = gql`
    mutation AddNewEmployee($firstName: String!, $lastName: String!, $email: String!) {
        addNewEmployee(first_name: $firstName, last_name: $lastName, email: $email) {
            id
            first_name
            last_name
            email
        }
    }
`

const EDIT_EMPLOYEE = gql`
    mutation UpdateEmployeeById($eid: ID!, $firstName: String!, $lastName: String!, $email: String!) {
        updateEmployeeById(eid: $eid, first_name: $firstName, last_name: $lastName, email: $email) {
        id
        first_name
        last_name
        email
        }
    }
`

const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployeeById($eid: ID!) {
        deleteEmployeeById(eid: $eid)
    }
`

const LOGIN = gql`
    query Query($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`

const SIGNUP = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            id
            username
            email
        }
    }
`

export { 
    GET_EMPLOYEES, 
    GET_EMPLOYEE_BY_ID, 
    ADD_EMPLOYEE, 
    EDIT_EMPLOYEE, 
    DELETE_EMPLOYEE,
    LOGIN,
    SIGNUP
}