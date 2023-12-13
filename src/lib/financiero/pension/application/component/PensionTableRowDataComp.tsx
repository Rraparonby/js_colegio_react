import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Pension} from '@/lib/financiero/pension/domain/entity/Pension';
import {PensionReturnView} from '@/lib/financiero/pension/application/util/return/PensionReturnView';

type PropsPensionTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	pension1: Pension,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function PensionTableRowDataComp(props: PropsPensionTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (pension1:Pension) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : pension1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:PensionReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.pension1);
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
		<tr onClick={(event) => onClickTableRow(props.pension1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.pension1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.pension1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.pension1.updated_at} </td>
			<td data-label=" Alumno"> {props.pension1.alumno!.nombre} </td>
			<td data-label="Anio" style={{textAlign:"center"}}> {props.pension1.anio} </td>
			<td data-label="Mes" style={{textAlign:"center"}}> {props.pension1.mes} </td>
			<td data-label="Valor" style={{textAlign:"center"}}> {props.pension1.valor} </td>
			<td data-label="Cobrado" style={{textAlign:"center"}}> {GetLabelBoolean(props.pension1.cobrado)} </td>
		</tr>	
	);
}

export {PensionTableRowDataComp};
