## Instalação

```bash
    npm install --save dinamicform
```

## O que é o dinamicform ?

![imagem de exemplo](https://uploaddeimagens.com.br/images/003/031/378/original/Captura_de_Tela_%2864%29.png?1610501567)

Beleza, sendo bem breve, esse componente serve para você criar formulários usando apenas json, ficou confuso? calma que daqui a pouco você irá ver um exemplo.
Atualmente com a demanda de tempo sendo grande em muitas empresas e os devs estando cada vez mais na correria, surge necessidade de padronização e fácil utilização
de certos componentes, imagina você fazendo um formulário de 30 campos, kkkk nunca vi um assim, mas supondo que exista, escrever tudo na mão é meio cansativo;
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

## Como configurar?

certo, chega de babozeira e vamos para a documentação profunda, como ele é um pacote bem completo, iremos passo a passo, do básico ao avançado.
aqui está dois bloco de código, foque mais nesse primeiro bloco: o ./Form.js; o segundo bloco irei explicar mais tarde, mas por enquanto, escrevi um formulário básico

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
                let value = values[name];
                if(required && !value){
                    return 'Campo Obrigatório';
                }
            }
        ],
        onError:err => console.log(err),
        components:[
            {
                type:'default',
                contentProps:{}, // passo props para a tag pai desse campo, nesse caso, é uma grid coluna
                content: field => (
                    <Fragment>
                            <input 
                                type='text' 
                                value={values[field.name]||''} // recomendo colocar o ||<formato do campo -> string|array|boolean/> caso contrário esse componente pode apresentar falhas; errado: value={values[field.name]}; certo: value={values[field.name] || []}
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
                help:'Usuário do login',
                required:true
            }
        ]}
        onSubmit={value => console.log(value)}
    />
```

O primeiro bloco de código que você ver alí em cima são as configurações do dinamicform, nomeei como "./Form.js", é aqui que você vai definir os tipos de campo que você irá usar em sua aplicação e os componentes para ele onde:

#### argumentos da função em bind
|nome|tipo|descrição|
| -------- | -------- | -------- |
|props | json | retorna todas as props passada no componente <Form .../> |
| errors | array | retorna todos os campos e seus respectivos erros, exemplo: ` [{name:'Campo Obrigatório'}, {username:'Campo Obrigatório'}] `|
| values | json | retorna os valores do formulário |
| handleValue | function | função responsável por mudar um determinado campo do formulário `handleValue(<nome do campo>, <valor>)` |
| submit | function | função responsável pelo envio do formulário, não aceita parâmetro algum nem tem retorno |
| clean | function | função responsável por limpar o formulário, não aceita parâmetro algum nem tem retorno |
| getAllFields | function | retorna todos os campos |

#### parâmetros de retorno

|nome|tipo|descrição|
| -------- | -------- | -------- |
|errors | array | retorna um array de funções responsáveis por customizar os erros do formuláro, você pode criar seus próprios erros customizáveis, como no exemplo acima, tem uma função que valida de forma básica se os campos que tem o atributo <b>required</b> está vazio ou não|
| onError | functon | função de evento, dispara toda vez que o formulário é submetido porém se ainda encontrar erro em algum campo, esse ouvinte retorna um array de campos invalidos e suas respectivas mensagens de erro |
| components | array | esse é o principal, aqui você coloca seus campos customizáveis, em cada json, temos o <b>type</b>: o tipo do campo; <b>content</b>: o conteúdo, o componente de campo em si |
|button| jsx | campo de submição do formulário |

## Como usar ?
### começando:

agora falo do "./index.js" onde importo o formulário configurado e aqui em baixo tenho o caso de uso com todas as props sendo passadas

````js
    // ./index.js
    import Form from './Form.js';

    <Form
        values={{name: 'Rodrigo', user: 'rodrigo@email.com'}} 
        fixedValues={{id:1}}
        spacing={2}
        ref={/*...*/}
        forwardRef={/*...*/}
        formData={false}
        init={form => console.log(form)}
        fields={[
            {
                col:4,
                type:'text',
                name:'name',
                label:'Nome',
            },
            {
                col:4,
                type:'text',
                name:'user',
                label:'Usuário',
                help:'Usuário do login',
            }
        ]}
        fixedFields={[
            {name:'nickname', required:true},
            {name: 'othername'},
        ]}
        onChangeField={(field, value) => console.log(field, value)}
        onSubmit={value => console.log(value)}
        beforeButton={<span>olá mundo</span>}
        afterButton={/*...*/}
        hiddenButtonSubmit={false}
        grid={{
            row:{/*...*/},
            col:{/*...*/}
        }}
        clean={false}
    />
````
### Props:

|nome | tipo | descrição |
| -------- | -------- | -------- |
| values | json | aqui eu passo o valor inicial do formulário, útil quando queremos "editar" um formulário, caso for "cadastro" não precio passar essa props ou passo como um objeto vazio. Padrão undefined |
|fixedValues|json|valor fixado, no momento da submição iremos ver esse resultado também junto aos outros|
|spacing| numeric | Por padrão: 2. Vai de 0 ao infinito, define o espaçamento das colunas. Internamente o formulário tem uma grid, podemos ver isso no `col:4` explico sobre isso mais tarde.|
|ref | | passo a referência do formulário para acessar certas propriedades. |
|forwardRef |  | caso eu não comsiga usar o ref (tem casos assim), eu tenho o forwardRef para aí sim me trazer o ref.|
|formData | Bolean | por padrão o onSubmit traz dados em json, mas se eu quiser trazer no formato form/data eu passo essa props. |
| init | function | escuto todas as propriedades, e posso salvar em uma variável ou algo assim, não confundir com ref, são conceitos diferentes. Padrão false|
|fields | array | passo os campos que quero no formulário |
|fixedFields| array | campos fixados, são campos que já quero definir por padrão, a primeira vista não parece necessário mas em breve irão entender|
|onChangeField|array|toda vez que um campo for alterado eu escuto ele por aqui|
|onSubmit|callback|escuto a submição do formulário|
|_onSubmit| callback | dispara independente se o formulário tem erro ou não, é diferente do onSubmit (esse só dispara se todos os campos estiverem validados, sem mensagens de erro) |
|beforeButton|  | passo qualquer coisa para ser renderizado antes do botão do formulário |
|afterButton| | passo qualquer coisa para ser renderizado depois do botão do formulário |
|hiddenButtonSubmit| Boolean | define se quero esconder os botões e seus irmãos beforeButton, afterButton. Padrão undefined|
|grid| json | passo props para a grid, no <b>row</b> tenho as props para as linhas e no <b>col</b> tenhos as props para colunas|
|clean|Boolean|defino se quero ou não que o formulário seja limpo automaticamente depois da submição.Padrão false|

## Casos de uso:

> As vezes não quero usar um campo, mas quero customizar ou apenas usar um conteúdo qualquer no formuláro. Então eu passo assim:
````js
    {
        /*...*/
    },
    {
        col:9,
        content:(evt)=>(
            <div>
                este conteúdo é somente para separar um campo do outro
                <hr/>
            </div>
        )
    },
    {
        /*...*/
    },
````
o content retorna: (todas props, handleValue, submit, clean, fields, getAllFields)
<hr/>

> posso também passar props para a coluna do meu campo

````js
    {
        col:9,
        type:'text',
        contentProps:{
            style:{
                background:'blue'
            }
        }
        /*...*/
    },
````