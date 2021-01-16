## Instalação

```bash
    npm install --save dinamicform
```

**[DEMO](https://codesandbox.io/s/demodinamicform-32wkc?file=/src/App.js)**

## O que é o dinamicform ?

![imagem de exemplo](https://uploaddeimagens.com.br/images/003/031/378/original/Captura_de_Tela_%2864%29.png?1610501567)

Beleza, sendo bem breve, esse componente serve para você criar formulários usando apenas json, ficou confuso? calma que daqui a pouco você irá vê um exemplo.
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
Aqui nessa configuração você vai definir os tipos de campo que você irá usar em sua aplicação e os componentes correspondentes a eles.
Abaixo há um exemplo, com um input tag bem simples para você entender o conceito.

```tsx
    // ./Form.config.js
    import React, {forwardRef, Fragment} from 'react';
    import Form from 'dinamicform';

    //forwardRef é opcional
    export default forwardRef(Form.bind(({
        props,
        errors,
        values,
        handleValue,
        submit,
        clean,
        getAllFields
    }) => ({
        breakpoints:{
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        },
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
                            <label>{field.label}</label>
                            <input 
                                type={field.type} 
                                value={values[field.name]||''} // recomendo colocar o ||<formato do campo -> string|array|boolean/> caso contrário esse componente pode apresentar falhas; errado: value={values[field.name]}; certo: value={values[field.name] || []}
                                onChange={evt => {
                                    handleValue(field.name, evt.target.value)
                                }} 
                                name={field.name}
                                placeholder={field.placeholder}
                                style={{width:'100%'}}
                            /> 
                            <span style={{color:'red'}}>{errors[f.name]}</span>                     
                    </Fragment>
                )
            }
        ],
        button:(
            <button onClick={submit}> Salvar </button>
        )
    })));
```
#### parâmetros de configuração:

|nome|tipo|descrição|
| -------- | -------- | -------- |
|breakpoints | json | Por padrão é os valores que você vê acima, aqui você pode configurar os breakpoints de sua aplicação, deixando-a responsíva. |
|errors | array | retorna um array de funções responsáveis por customizar os erros do formuláro, você pode criar seus próprios erros customizáveis, como no exemplo acima, tem uma função que valida de forma básica se os campos que tem o atributo <b>required</b> está vazio ou não.|
| onError | functon | função de evento, dispara toda vez que o formulário é submetido, porém se ainda encontrar erro em algum campo esse ouvinte retorna um array de campos invalidos e suas respectivas mensagens de erro, exemplo: ` [{name:'Campo Obrigatório'}, {username:'Formato Inválido'}] ` |
| components | array | esse é o principal, aqui você coloca seus campos customizáveis, em cada json, temos o <b>type</b>: o tipo do campo, você também pode passar múltiplos types `type: ['default', 'text']` <b>content</b>: o conteúdo, o componente de campo em si. |
|button| jsx/html | campo de submição do formulário. |


#### parâmetros de retorno da função em bind:
|nome|tipo|descrição|
| -------- | -------- | -------- |
|props | json | retorna todas as props passadas no componente <Form .../> |
| errors | array | retorna todos os campos e seus respectivos erros, exemplo: ` [{name:'Campo Obrigatório'}, {username:'Formato Inválido'}] `|
| values | json | retorna os valores do formulário. |
| handleValue | function | função responsável por mudar um determinado campo do formulário `handleValue(<nome do campo>, <valor>, <qualquer coisa>)` o terceiro parámetro será ouvido no onChangeField(field, value, qualquer coisa) que você verá logo a seguir |
| submit | function | função responsável pelo envio do formulário, não aceita parâmetro algum nem tem retorno. |
| clean | function | função responsável por limpar o formulário, não aceita parâmetro algum nem tem retorno. |
| getAllFields | function | retorna todos os campos do formulário. |



## Como usar ?
### começando:

Abaixo tenho o caso de uso com todas as props sendo passadas, use as que você achar necessárias.
Você também pode passar suas próprias props personalizadas e pegar em Form.config.js para fazer algo, mas cuidado, use com sabedoria.

```js
    // ./index.js
    import Form from './Form.config.js';

    <Form
        values={{name: 'Rodrigo', user: 'rodrigo@email.com'}} 
        fixedValues={{tel:01589999888888}}
        spacing={2}
        ref={/*...*/}
        forwardRef={/*...*/}
        formData={false}
        init={form => console.log(form)}
        fields={[
            {
                col:4, //--é o mesmo que xs, padrão 12
                xs:4,
                sm:6,
                md:4,
                lg:3,
                xl:2,
                type:'text',
                name:'name',
                label:'Nome',
                contentProps:{} // passo props para a tag pai desse campo, nesse caso, é uma grid coluna
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
```
### Props:

|nome | tipo | descrição |
| -------- | -------- | -------- |
| values | json | aqui eu passo o valor inicial do formulário, útil quando queremos editar um formulário, caso for cadastro não precio passar essa props ou passo como um objeto vazio. Padrão undefined. |
|fixedValues|json|valores fixados, no momento da submição o formulário irá retornar os resultados dessa props também junto aos outros campos, no exemplo acima temos um número de telefone fictício.|
|spacing| numeric | Padrão: 2. Vai de 0 ao infinito, define o espaçamento das colunas. Internamente o formulário tem uma grid, podemos vê isso no `col:4` explico sobre isso mais tarde.|
|ref | | passo a referência do formulário para acessar certas propriedades. |
|forwardRef |  | caso eu não comsiga usar o ref (tem casos assim), eu tenho o forwardRef para aí sim me trazer o ref.|
|formData | Bolean | por padrão o onSubmit traz dados em json, mas se eu quiser trazer no formato form/data eu passo essa props. |
| init | function | escuto todas as propriedades, e posso salvar em uma variável ou algo assim, não confundir com ref, são conceitos diferentes.|
|fields | array | passo os campos que quero no formulário. |
|fixedFields| array | campos fixados, são campos que já quero definir por padrão, a primeira vista não parece necessário mas em breve irão entender.|
|onChangeField|array|toda vez que um campo for alterado eu escuto ele por aqui.|
|onSubmit|callback|escuto a submição do formulário.|
|_onSubmit| callback | dispara independente se o formulário tem erro ou não, é diferente do onSubmit (esse só dispara se todos os campos estiverem validados, sem mensagens de erro) |
|beforeButton|  | passo qualquer coisa para ser renderizado antes do botão do formulário. |
|afterButton| | passo qualquer coisa para ser renderizado depois do botão do formulário. |
|hiddenButtonSubmit| Boolean | define se quero esconder os botões e seus irmãos beforeButton, afterButton. Padrão undefined.|
|grid| json | passo props para a grid, no <b>row</b> tenho as props para as linhas e no <b>col</b> tenhos as props para colunas.|
|clean|Boolean|defino se quero ou não que o formulário seja limpo automaticamente depois da submição.Padrão false.|



## Casos de uso:

> Se eu quero definir um campo como obrigatório eu passo required: true
```js
{
    col:9,
    type:'text',
    name:'name',
    required:true,
    /*...*/
},
```
<hr/>

> posso também passar props para a coluna do meu campo

```js
    {
        col:9,
        type:'text',
        contentProps:{
            style:{
                background:'blue'
            }
        },
        /*...*/
    },
```

<hr/>

> As vezes não quero usar um campo, mas quero customizar ou apenas usar um conteúdo qualquer no formuláro. Então eu passo assim:
```js
    {
        /*...*/
    },
    {
        col:12,
        component:(evt)=>(
            <div>
                este hr é somente para separar um campo do outro
                <hr/>
            </div>
        )
    },
    {
        /*...*/
    },
```
o `component` retorna: (todas as props, handleValue, submit, clean(), fields, getAllFields())

<hr/>

> Eu também posso passar props dentro dos fields json, e pegar elas em Form.config.js. No exemplo abaixo suponhamos que eu tenha um component de select criado lá no arquivo de configuração, eu vou querer passar options para ele, correto? então faço assim:
```js
    {
        /*...*/
    },
    {
        col:9,
        type:'select',
        options:[
            {value:1, label:'Opção 1'},
            {value:1, label:'Opção 2'},
        ],
        /*...*/
    },
    {
        /*...*/
    },
```
No Form.config.js na parte de components, no campo de type igual a select pego ` field.options `

<hr/>

> As vezes quero englobar um campo por um wrap.
```js
    {
        /*...*/
    },
    {
        wrap(children){
            <div style={{
                backgroundColor:'#92d050', 
                padding:20,
                borderRadius:10
            }}>
                {children}
                <span>Olá mundo</span>
            </div>
        },
        col:9,
        type:'select',
        /*...*/
    },
    {
        /*...*/
    },
```
![Exemplo usando wrap props](https://uploaddeimagens.com.br/images/003/032/637/original/Capturar.PNG?1610582873)

<hr/>

> Eu posso também criar linhas e colunas por aqui, quando eu tiver um ` fields ` props dentro do json, significa que quero usa-lo como uma linha, e no array escrevo as colunas.
```js
    {
        /*...*/
    },
    {
        wrap(){/*...*/}, //posso passar um wrap para a linha se eu quiser também
        col:6,
        fields:[
            {
                col:6,
                type:'text',
                /*...*/
            },
            {
                col:6,
                type:'text',
                /*...*/
            }
        ]
    },
    {
        col:6,
        fields:[
            {
                col:6,
                type:'text',
                /*...*/
            }
            {
                col:6,
                type:'text',
                /*...*/
            }
            {
                col:6,
                type:'text',
                /*...*/
            }
        ]
    },
    {
        /*...*/
    },
```
<hr/>

> Quase todo formulário tem um select, e em muitos casos um campo de seleção depende de outro, por exemplo, ao selecionar um estado queremos carregar as cidades daquele estado em outro campo de seleção para o usuário escolher. Suponhamos que esses dois campos são obrigatórios e que um usuário selecione um estado e uma cidade, mas logo depois mude o valor novamente do campo estado, em teoria o campo cidade deve se limpar também, caso contrário enviariamos dados errado para o servidor. Automaticamente isso não acontece, precisamos informar ao formulário qual campo depende de outro, então passamos um atributo chamado ` dependence: <indicador>-<ordem> `

```js
    {
        col:6,
        name:'country',
        options:[/*...*/],
        dependence: 'snack-1'
    },
    {
        col:6,
        name:'state',
        options:[/*...*/],
        dependence: 'snack-2'
    },
    {
        col:6,
        name:'city',
        options:[/*...*/],
        dependence: 'snack-3'
    },
```

o atributo é ` dependence: <indicador>-<ordem> ` aqui nesse exemplo coloquei "indicator" como `snack` (você escolhe o nome, é para diferenciar caso haja outros campos com outras dependência) e em seguida coloquei a ordem de dependência, significa que o campo city depende do campo state que depende do campo country, ou olhando de forma inversa,
country é superior a state que é superior a city, vai do menor para o maior. assim, toda vez que eu mudar o campo country por exemplo, o campo state e city irão limpar seus valores. Recomendo ver na prática.

## Fim

Bom, por enquanto é isso, espero que eu não esteja esquecendo de nada kkk, quem quiser contrinuir, comentar algo, segue meu repositório.
Ah sim, versão estável a partir da 1.1.6, as anteriores eram testes no npm. Em breve estarei colocando uma pasta de exemplos.