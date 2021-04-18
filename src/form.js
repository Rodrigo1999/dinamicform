import React, {useState, useEffect, useCallback, useImperativeHandle} from 'react';
import Grid from './Grid';
import {Form} from './style';
import {objectToForm} from './utils';

export default function(props, ref){
    let {
        fields,
        fixedValues,
        fixedFields=[],
        beforeButton,
        afterButton,
        onSubmit,
        hiddenButtonSubmit,
        spacing,
        grid={},
        formData,
        _onSubmit=()=>null,
        onChangeField=()=>null,
        init=()=>null,
        innerRef,
        alignItems,
        justify,
        alignContent,
        direction,
        className
    } = props;

    let [values, setValues] = useState({});
    let [errors, setErrors] = useState({});
    
    //---------------------------------------------- retorna todos os campos-------------------------------------
    let getAllFields = useCallback((fields) => {
        return fields.flatMap(e => e.fields ? getAllFields(e.fields) : e);
    }, [fields]);

    //---------------------------------------------- limpesa dos formulários-------------------------------------
    let clean = useCallback(()=>{
        let fd = getAllFields(fields).filter(e => e.visible != false).concat(fixedFields.filter(e => e.visible != false));
        setValues(fd.reduce((obj, e)=>{obj[e.name]=undefined; return obj}, {}));
    }, [fields, fixedFields]);

    //---------------------------------------------- alteração de valores -------------------------------------
    let handleValue = useCallback((name, val, selected)=>{
        let allFd = getAllFields(fields);
        let fd = allFd.filter(e=>e.visible!=false).find(e=>e.name==name);

        if(!fd) return false;
        
        setValues(values => {
            if(fd.dependence){
                let dependence = fd.dependence.split('-');
                allFd.forEach(e => {
                    if(!e.dependence) return false;
                    let myDependence = e.dependence.split('-');
                    if(dependence[0] == myDependence[0] && parseInt(myDependence[1]) > parseInt(dependence[1])){
                        values[e.name] = undefined;
                    }
                });
            }
            return {...values, [name]:val};
        });
        onChangeField(fd, val, selected);
        
    }, [fields]);

    //---------------------------------------------- seta as confgurações externas -------------------------------------
    let {
        errors:controlErrors=[], 
        components, 
        onError=()=>null, 
        breakpoints,
        button
    } = this({
        props,
        errors,
        values,
        handleValue,
        submit,
        clean,
        getAllFields
    });

//---------------------------------------------- useEffects -------------------------------------
    useEffect(()=>{
		setInitialValues();
    }, [props.values]);

    useEffect(() => {
        if(Object.values(errors).length){
            let _errors = treatErrors();
            setErrors(_errors);
        }
    }, [values])

//---------------------------------------------- seta o valor inicial do formulário -------------------------------------
    let setInitialValues = useCallback(()=>{
		let _fields =  getAllFields(fields).filter(e=>e.visible!=false);
        let _values = Object.assign({}, props.values, fixedValues);
        
		if(_values){
            let this_values = Object.assign({}, values);
            
			_fields.forEach(e => {
			  	if(e.name && e.input){
				    _values[e.name] = e.input(_values[e.name]);
			  	}
			});
			Object.keys(_values).forEach(k => {
				if(this_values[k]===undefined){
					this_values[k] = _values[k]
				}
            });
            
			setValues(this_values);
		}
    }, [props.values, fields])
//---------------------------------------------- tratamento de erros -------------------------------------
    let treatErrors = useCallback(()=>{
        let allFd = getAllFields(fields);
        let fd =  allFd.filter(e => e.visible != false).concat(fixedFields.filter(e => e.visible != false));
        let _errors = Object.assign({}, errors);
        
        fd.forEach(field=>{
            delete _errors[field.name];
            controlErrors.forEach(e=>{
                let err = e(field);
                if(err){
                    _errors[field.name] = err;
                }
            });
            
            if(field.error){
                let err = field.error({fields:allFd, field, values, value:values[field.name]});
                if(err){
                    _errors[field.name] = err;
                }
            }
        });
        return _errors;
    }, [fields, fixedFields])

//---------------------------------------------- submição de formulário -------------------------------------
    function submit(evt){
        evt.preventDefault();
        let _errors = treatErrors();
        let _values = Object.assign({}, values);

        let fd = getAllFields(fields).filter(e => e.visible != false).concat(fixedFields.filter(e => e.visible != false));      
		fd.filter(e => e.output && e.visible!=false).forEach(e=>{
            _values[e.name] = e.output(values[e.name]);
        });
        
        _onSubmit(_values);
        
		if(!!Object.values(_errors).length){
            setErrors(_errors);
            onError(_errors);
			return false;
		}else{
            if(formData){
                _values = objectToForm(_values);
            }
            if(onSubmit) onSubmit(_values);
            if(props.clean) clean();
            
            return true;
			
		}
        
    }
//---------------------------------------------- controle de referência -------------------------------------
    
    useImperativeHandle(
        Object.keys(innerRef||ref||{}).length ? innerRef||ref : {current:null}
    , () => ({
        handleValue,
        submit,
        clean,
        fields,
        getAllFields:getAllFields(fields)
    }));
    init({
        handleValue,
        submit,
        clean,
        fields,
        getAllFields:getAllFields(fields)
    })
//---------------------------------------------- controle de linhas e colunas -------------------------------------
    let comp = useCallback((f) => components.find(c => [].concat(c.type).includes(f.type)), [components]);
    function _fields(f){
        if(f.fields) return render(f.fields);
        if(f.type=='component') return f?.content({...props, handleValue, submit, clean, values, fields, getAllFields:getAllFields(fields)});

        return (comp(f)||components.find(e => [].concat(e.type).includes('default'))).content(f);
    }
    let render = useCallback((fields) => {
        
        return(
            <Grid 
                row 
                alignItems={alignItems||'flex-start'} 
                justify={justify}
                alignContent={alignContent}
                direction={direction}
                spacing={spacing||2} 
                {...grid.row}
            >
                {fields.filter(e => e.visible!=false).map(f=> {
                    let field = comp(f)||components.find(e => [].concat(e.type).includes('default'));
                    return (
                        <Grid 
                            breakpoints={breakpoints} 
                            xs={f.col||12} 
                            xl={f.xl}
                            sm={f.sm}
                            md={f.md}
                            lg={f.lg}
                            key={f.name}
                            {...field.contentProps}
                            {...grid.col}
                            {...f.contentProps} 
                            style={{
                                ...grid.col?.style,
                                ...field.contentProps?.style,
                                ...f.contentProps?.style,
                            }}
                            className={['form-field', field.contentProps?.className, f.contentProps?.className].filter(Boolean).join(' ')}
                        >
                            {f.beforeContent}
                            {f.wrap ? f.wrap(_fields(f)) : _fields(f)}
                            {f.afterContent}
                        </Grid>
                    )
                })}
            </Grid>
        )
    }, [fields, breakpoints, grid, spacing]);
//---------------------------------------------- COMPONENTE -------------------------------------
    return (

        <Form onSubmit={submit} className={className}>
            {render(fields)}
            {!hiddenButtonSubmit&&(beforeButton||onSubmit||afterButton) &&
                <div className='content-buttons'>
                    {beforeButton}
                    {onSubmit && button}
                    {afterButton}
                </div>
                
            }
        </Form>
		
    )
}