import { createContext, ChangeEventHandler } from "react"

export interface Employee {
    fullname: string,
    dob: string,
    position: number,
    email: string,
    phone: string,
    photo: string
}

export const employeeInitialState: Employee = {
    fullname: '',
    dob: '',
    position: 0,
    email: '',
    phone:'',
    photo:''
}

export interface EmployeeContextData {
    handleChange: ChangeEventHandler<HTMLInputElement> | null,
    data: Employee,
    locked: boolean
}



export const EmployeeContext = createContext<Employee>(employeeInitialState)


