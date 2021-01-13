## Instalação

```bash
    npm install --save dinamicform
```


## O que é o dinamicform ?

Beleza, sendo bem breve, esse componente serve para você criar formulários usando apenas json, ficou confuso? calma que daqui a pouco você irá ver um exemplo.
Atualmente com a demanda de tempo sendo grande em muitas empresas e os devs estando cada vez mais na correria, surge necessidade de padronização e fácil utilização
de certos componentes, imagina você fazendo um formulário de 30 campos, kkkk nunca vi um assim, mas supondo que exista, escrever tudo na mão é meio cansativo
é aí que entra o dinamicform, ele irá te ajudar a acelerar o processo, segue um exemplo básico abaixo.

```js
    {
        col:6,
        type:'text',
        name:'name',
        label:'Nome',
        placeholder:'Escreva seu nome'
    },
    {
        col:6,
        type:'text',
        name:'surname',
        label:'Sobrenome',
        placeholder:'Escreva seu sobrenome'
    },
    {
        col:6,
        type:'text',
        name:'cpf',
        label:'CPF',
        format:'###.###.###-##',
        placeholder:'Digite seu cpf'
    }
    ...
```

certo, chega de babozeira e vamos para a documentação, como ele é um pacote bem completo, iremos passo a passo, do básico ao avançado.

## Como usar?

```tsx
    // ./Form.js
    import React, {forwardRef, Fragment} from 'react';
    import Form from 'dinamicform';

    export default forwardRef(Form.bind(({
        props,
        errors,
        values,
        handleValue,
        submit,
        clean,
        getAllFields
    }) => ({
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
                content: field => (
                    <Fragment>
                            <input 
                                type='text' 
                                value={values[field.name]||''} 
                                onChange={evt => {
                                    handleValue(field.name, evt.target.value)
                                }} 
                                name={field.name}
                                placeholder={field.placeholder}
                                style={{width:'100%'}}
                            /> 
                            <span>{errors[f.name]}</span>                     
                    </Fragment>
                )
            }
        ],
        button:(
            <button onClick={submit}> Salvar </button>
        )
    })));
```
```tsx
    // ./index.js
    import Form from './Form.js';

    <Form
        fields={[
            {
                col:4,
                type:'text',
                name:'name',
                label:'Nome',
                help:'Nome da instituição'
            },
            {
                col:4,
                type:'text',
                name:'service',
                label:'Tipo de serviço',
            },
            {
                col:4,
                type:'text',
                name:'user',
                label:'Usuário',
                help:'Usuário do login'
            }
        ]}
        onSubmit={value => console.log(value)}
    />
```

O primeiro bloco de código que você ver aí em cima são as configurações do dinamicform, nomeei como "./Form.js", onde:

#### argumentos das funções
|nome|tipo|descrição|
| -------- | -------- | -------- |
|props | json | retorna todas as props passada no componente <Form .../> |
| errors | array | retorna todos os campos e seus respectivos erros, exemplo ` [{name:'Campo Obrigatório'}, {username:'Campo Obrigatório'}] `|
| values | json | retorna os valores do formulário |
| handleValue | function | função responsável por mudar um determinado campo do formulário `handleValue(<nome do campo>, <valor>)` |
| submit | function | função responsável pelo envio do formulário, não aceita parâmetro algum nem tem retorno |
| clean | function | função responsável por limpar o formulário, não aceita parâmetro algum nem tem retorno |
| getAllFields | function | retorna todos os campos |