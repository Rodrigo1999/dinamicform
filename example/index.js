import React, {forwardRef, useState} from 'react';
import Form from '../dist/index';

export default forwardRef(Form.bind(({
    errors,
    variant,
    margin,
    values,
    handleValue,
    onlyField,
    fields,
    submit
})=>({
    errors:[
        field => {

            let {required, name} = field;
            if(required &&

                ((typeof values[name]=='string') ? 
                    !values[name].replace(/<\/?[^>]+(>|$)/g, ""): 
                Array.isArray(values[name])?
                     !values[name].length:
                values[name]===undefined)
            ){
                return 'Campo Obrigatório';
            }
        }
    ],
    onError:err => console.log(err),
    components:[
        {
            type:'default',
            content:(field)=>(
                <input 
                    type='text' 
                    value={values[field.name]||''} 
                    onChange={evt => {
                        handleValue(field.name, evt.target.value)
                    }} 
                    name={field.name}
                    placeholder='preencha'
                    style={{width:'100%'}}
                /> 
            )
        }
    ],
    button:(
        <button onClick={submit}>Submit {Store.loading}</button>
    )
})));