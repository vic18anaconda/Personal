//@ts-nocheck
import React, {  useContext } from 'react'

import { EmployeeContext, EmployeeContextData } from '../../import/employeeContext.ts'


function RolesMenu() {

    const {data:{position}, handleChange} = useContext<EmployeeContextData>(EmployeeContext)
    return(
        <div>
            <label>Puesto:</label>
            <select
                name='position'
                value={position}
                onChange={handleChange}
            >
                <option value={0}>No asignado</option>
                <option value={1}>Gerente</option>
                <option value={2}>Desarrollador Jr.</option>
                <option value={3}>Desarrollador Sr.</option>
                <option value={4}>Soporte</option>
                <option value={5}>Lider de proyecto</option>
            </select>
            
        </div>
    )
}

export default RolesMenu