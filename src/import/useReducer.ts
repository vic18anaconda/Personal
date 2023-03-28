//@ts-nocheck
import {Employee} from './employeeContext.ts'

type AuthAction =
| { type: 'lock' }
| { type: 'unlock', payload: Employee }


export const authReducer = (state: Employee, action: AuthAction) => {
    switch(action.type){
        case 'lock':
            console.log(state)
            return{
                ...state,
                
            }
        case 'unlock':
            const finalData = action.payload
            return finalData
        default:
            return state;
    }
}
