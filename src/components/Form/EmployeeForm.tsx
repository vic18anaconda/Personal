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
    

    
    const [phoneError, setPhoneError] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [isLocked, setIsLocked] = useState<boolean>(false)

    const validate = () => {
        let phoneErrorMsg = '';
        let emailErrorMsg = '';
      
        if (!phone) {
          phoneErrorMsg = 'El número de teléfono es obligatorio';
        } else if (!/^\d{10}$/.test(phone)) {
          phoneErrorMsg = 'El número de teléfono no es válido';
        }
      
        if (!email) {
          emailErrorMsg = 'La dirección de correo electrónico es obligatoria';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
          emailErrorMsg = 'La dirección de correo electrónico no es válida';
        }
      
        setPhoneError(phoneErrorMsg);
        setEmailError(emailErrorMsg);
    };
      
    
    const unlock = () =>{
        const payload = { ...data, locked: false };
        dispatch({type: 'unlock', payload})
        setIsLocked(false);
        
    }
    
    
    const lock = () => {

        validate();
        if (phoneError || emailError || !fullname || !dob || !position ) {
            
            return;
        }
        dispatch({type: 'lock'})
        setIsLocked(true); 
        
        
    }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        validate();

        if (phoneError || emailError || !fullname || !dob || !position ) {
            alert("Por favor, complete todos los campos obligatorios y corrija cualquier error.");
            return;
        }
      
        if (!isLocked) {
          
          unlock();
          setIsLocked(false);
        } else {
          
            lock();
            setIsLocked(true);
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
                        required
                    />
                </label>
                <br/>
                <label> Fecha de nacimiento: 
                    <input
                        type='date'
                        name='dob'
                        value={dob}
                        onChange={handleChangeLocked}
                        required
                    />
                </label>
                <br/>
                <PositionMenu/>

                <label>
                    E-mail:
                    <input 
                        required='true'
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChangeLocked}
                        required
                    /> 
                    <br />
                    <span style={{ color: "red" }}>{emailError}</span>
                    
                </label>
                <br/>
                <label>Telefono:
                    <input
                        type='tel'
                        name='phone'
                        value={phone}
                        onChange={handleChangeLocked}
                        required
                    /><br/>
                    <br />
                    <span style={{ color: "red" }}>{phoneError}</span>
                    
                    
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