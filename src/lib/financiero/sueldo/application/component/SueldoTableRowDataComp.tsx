import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Sueldo} from '@/lib/financiero/sueldo/domain/entity/Sueldo';
import {SueldoReturnView} from '@/lib/financiero/sueldo/application/util/return/SueldoReturnView';

type PropsSueldoTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	sueldo1: Sueldo,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function SueldoTableRowDataComp(props: PropsSueldoTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (sueldo1:Sueldo) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : sueldo1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:SueldoReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.sueldo1);
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
		<tr onClick={(event) => onClickTableRow(props.sueldo1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.sueldo1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.sueldo1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.sueldo1.updated_at} </td>
			<td data-label=" Docente"> {props.sueldo1.docente!.nombre} </td>
			<td data-label="Anio" style={{textAlign:"center"}}> {props.sueldo1.anio} </td>
			<td data-label="Mes" style={{textAlign:"center"}}> {props.sueldo1.mes} </td>
			<td data-label="Valor" style={{textAlign:"center"}}> {props.sueldo1.valor} </td>
			<td data-label="Cobrado" style={{textAlign:"center"}}> {GetLabelBoolean(props.sueldo1.cobrado)} </td>
		</tr>	
	);
}

export {SueldoTableRowDataComp};
