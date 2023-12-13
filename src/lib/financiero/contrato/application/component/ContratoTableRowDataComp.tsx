import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';
import {ContratoReturnView} from '@/lib/financiero/contrato/application/util/return/ContratoReturnView';

type PropsContratoTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	contrato1: Contrato,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function ContratoTableRowDataComp(props: PropsContratoTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (contrato1:Contrato) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : contrato1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:ContratoReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.contrato1);
			} else {
				console.log(await response_json.json());
			}
		} catch(error) {
			console.log(error);
		}
	};
	
	

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};
	
	return (	
		<tr onClick={(event) => onClickTableRow(props.contrato1)}>						
			<td data-label="" style={props.style_id_column}> {props.contrato1.docente!.nombre} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.contrato1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.contrato1.updated_at} </td>
			<td data-label="Anio" style={{textAlign:"center"}}> {props.contrato1.anio} </td>
			<td data-label="Valor" style={{textAlign:"center"}}> {props.contrato1.valor} </td>
			<td data-label="Fecha"> {props.contrato1.fecha} </td>
			<td data-label="Firmado" style={{textAlign:"center"}}> {GetLabelBoolean(props.contrato1.firmado)} </td>
		</tr>	
	);
}

export {ContratoTableRowDataComp};
