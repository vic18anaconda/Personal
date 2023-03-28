//@ts-nocheck
import React, { FormEvent, FormEventHandler, useReducer, useState } from 'react'
import useForm from '../../hooks/useForm.ts'
import { EmployeeContext, employeeInitialState, Employee, EmployeeContextData } from '../../import/employeeContext.ts'
import { authReducer } from '../../import/useReducer.ts'
import EmployeeCard from '../Card/EmployeeCard.tsx'
import PositionMenu from './PositionMenu.tsx'

function EmployeeForm() {
    const [data, handleChange] = useForm<Employee>(employeeInitialState)    
    const {fullname, dob, email, phone, photo, position} = data

    const [finalData, dispatch] = useReducer(authReducer, employeeInitialState)
    const contextData: EmployeeContextData = { data, handleChange, locked:false }
    
    const unlock = () =>{
        const payload = data
        dispatch({type: 'unlock', payload})
    }
    const lock = () => dispatch({type: 'lock'})

    const handleSubmit = (e: FormEventHandler<HTMLFormElement>) => {
        e.preventDefault();
        lock() || unlock()
        
    };
    return(
        <EmployeeContext.Provider value = {contextData}>
            <form onSubmit={handleSubmit}>
                <label> Nombre completo: 
                    <input
                        type='text'
                        name='fullname'
                        value={fullname}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label> Fecha de nacimiento: 
                    <input
                        type='date'
                        name='dob'
                        value={dob}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <PositionMenu/>

                <label>E-mail:
                    <input required='true'
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Telefono:
                    <input
                        type='tel'
                        name='phone'
                        value={phone}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                Foro de perfil
                <input
                    type='file'
                    accept="image/png, image/gif, image/jpeg"
                    name='photo'
                    
                    onChange={handleChange}
                />
                <button onClick={lock}>Bloquear tarjeta</button>
                <button onClick={unlock}>Desloquear tarjeta</button>
            </form>
            <EmployeeCard/>
        </EmployeeContext.Provider>
    )
}

export default EmployeeForm