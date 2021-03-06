import React from 'react';
import styled from 'styled-components';

let Row = styled.div`
    width: ${props => `calc(100% + ${props.spacing * 2}px)`};
    margin: ${props => `-${props.spacing}px`};
    display:flex;
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-content: ${props => props.alignContent};
    align-items: ${props => props.alignItems};
    box-sizing: border-box;
    flex-wrap:wrap;
    .grid-col{
        padding: ${props => `${props.spacing}px`};
    }
`

let Col = styled.div`
    ${props => {
        let literal = '';
        ['xs', 'xl', 'sm', 'md', 'lg'].forEach(e=>{
            literal+=`
                @media(min-width: ${props.breakpoints[e]}px) {
                    max-width: ${props[e] ? `${100*props[e]/12}%` : undefined};
                    flex-basis: ${props[e] ? `${100*props[e]/12}%` : undefined};
                }
            `
        })
        return literal;
    }}
`

export default function({
    row,
    spacing=0,
    direction,
    justify,
    alignItems,
    alignContent,
    children,
    breakpoints:_breakpoints,
    xs=12,
    xl,
    sm,
    md,
    lg,
    className,
    ...other
}){
    let breakpoints = {
        xs: _breakpoints?.xs||0,
        sm: _breakpoints?.sm||600,
        md: _breakpoints?.md||960,
        lg: _breakpoints?.lg||1280,
        xl: _breakpoints?.xl||1920,
    };

    return row ? (
        <Row spacing={spacing*4} justify={justify} alignContent={alignContent} direction={direction} alignItems={alignItems}>
            {children}
        </Row>
    ):(
        <Col 
            {...other}
            className={'grid-col '+className} 
            breakpoints={breakpoints}
            xs={xs}
            xl={xl}
            sm={sm}
            md={md}
            lg={lg}
        >
            {children}
        </Col>
    )
}