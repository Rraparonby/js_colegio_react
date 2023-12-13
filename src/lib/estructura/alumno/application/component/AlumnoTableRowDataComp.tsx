import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import {AlumnoReturnView} from '@/lib/estructura/alumno/application/util/return/AlumnoReturnView';

type PropsAlumnoTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	alumno1: Alumno,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function AlumnoTableRowDataComp(props: PropsAlumnoTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (alumno1:Alumno) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : alumno1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:AlumnoReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.alumno1);
			} else {
				console.log(await response_json.json());
			}
		} catch(error) {
			console.log(error);
		}
	};
	
	
	
	return (	
		<tr onClick={(event) => onClickTableRow(props.alumno1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.alumno1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.alumno1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.alumno1.updated_at} </td>
			<td data-label="Nombre"> {props.alumno1.nombre} </td>
			<td data-label="Apellido"> {props.alumno1.apellido} </td>
			<td data-label="Fecha Nacimiento"> {props.alumno1.fecha_nacimiento} </td>
		</tr>	
	);
}

export {AlumnoTableRowDataComp};
