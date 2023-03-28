//@ts-nocheck
import React, { FormEvent, FormEventHandler, useReducer, useState , useContext} from 'react'
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
    

    const [isLocked, setIsLocked] = useState(false);
    
    const unlock = () =>{
        const payload = data
        dispatch({type: 'unlock', payload})
        setIsLocked(false);
        
    }
    
    
    const lock = () => {
        dispatch({type: 'lock'})
        setIsLocked(true); 
        
    }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!isLocked) {
          // Si la tarjeta no está bloqueada, permite la edición y luego bloquea la tarjeta
          unlock();
          lock();
        } else {
          // Si la tarjeta está bloqueada, muestra un mensaje de error
          alert("La tarjeta de empleado está bloqueada y no se puede editar.");
        }
    };

    

    const lockMessage = isLocked ? "La tarjeta de empleado se ha generado y ya no puede ser editada." : "La tarjeta de empleado está desbloqueada y se puede editar.";
    
    const handleChangeLocked = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isLocked) {
            handleChange(e);
        }
    } 


    return(
        <EmployeeContext.Provider value = {contextData}>
            <div>
                <p>{lockMessage}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <label> Nombre completo: 
                    <input
                        type='text'
                        name='fullname'
                        value={fullname}
                        onChange={handleChangeLocked}
                    />
                </label>
                <br/>
                <label> Fecha de nacimiento: 
                    <input
                        type='date'
                        name='dob'
                        value={dob}
                        onChange={handleChangeLocked}
                    />
                </label>
                <br/>
                <PositionMenu/>

                <label>E-mail:
                    <input required='true'
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChangeLocked}
                    />
                </label>
                <br/>
                <label>Telefono:
                    <input
                        type='tel'
                        name='phone'
                        value={phone}
                        onChange={handleChangeLocked}
                    />
                </label>
                <br/>
                Foro de perfil
                <input
                    type='file'
                    accept="image/png, image/gif, image/jpeg"
                    name='photo'
                    
                    onChange={handleChangeLocked}
                />
                <button onClick={lock}>Bloquear tarjeta</button>
                <button onClick={unlock}>Desbloquear tarjeta</button>
                
            </form>
            <EmployeeCard/>
        </EmployeeContext.Provider>
    )
}

export default EmployeeForm