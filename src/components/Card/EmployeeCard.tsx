//@ts-nocheck
import React, {useContext, useState} from 'react'
import { EmployeeContext, EmployeeContextData } from '../../import/employeeContext.ts'
function EmployeeCard(){

    const {data:{fullname, dob, position, email, phone, photo}, locked} = useContext<EmployeeContextData>(EmployeeContext)

    return(
        <>
            { locked==false &&
            <div>
                <h3>Nombre: {fullname}</h3>
                <h3>Fecha de nacimiento: {dob}</h3>
                <h3>Puesto: {position}</h3>
                <h3>E-mail: {email}</h3>
                <h3>Número de teléfono: {phone}</h3>
                { photo && 
                    <img src={URL.createObjectURL(photo)}/>
                }
            </div>
            }
            
        </>
    )
}

export default EmployeeCard