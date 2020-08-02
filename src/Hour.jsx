import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { render } from '@testing-library/react';


function Hour(props){
    
    return(
   <>
    <p id="hourdt{props.no}">aaa</p>
           <img id="hourimg{props.no}" src=""/>
           <p id="hourdesc{props.no}">aaaaaa</p>
           <p id="hourtemp{props.no}">aaa</p>
    
    </>);
}


export default Hour;