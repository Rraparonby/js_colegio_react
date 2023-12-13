import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Matricula} from '@/lib/proceso/matricula/domain/entity/Matricula';
import {MatriculaReturnView} from '@/lib/proceso/matricula/application/util/return/MatriculaReturnView';

type PropsMatriculaTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	matricula1: Matricula,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function MatriculaTableRowDataComp(props: PropsMatriculaTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (matricula1:Matricula) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : matricula1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:MatriculaReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.matricula1);
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
		<tr onClick={(event) => onClickTableRow(props.matricula1)}>						
			<td data-label="" style={props.style_id_column}> {props.matricula1.alumno!.nombre} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.matricula1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.matricula1.updated_at} </td>
			<td data-label="Anio" style={{textAlign:"center"}}> {props.matricula1.anio} </td>
			<td data-label="Costo" style={{textAlign:"center"}}> {props.matricula1.costo} </td>
			<td data-label="Fecha"> {props.matricula1.fecha} </td>
			<td data-label="Pagado" style={{textAlign:"center"}}> {GetLabelBoolean(props.matricula1.pagado)} </td>
		</tr>	
	);
}

export {MatriculaTableRowDataComp};
