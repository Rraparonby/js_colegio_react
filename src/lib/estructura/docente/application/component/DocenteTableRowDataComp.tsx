import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import {DocenteReturnView} from '@/lib/estructura/docente/application/util/return/DocenteReturnView';

type PropsDocenteTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	docente1: Docente,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function DocenteTableRowDataComp(props: PropsDocenteTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (docente1:Docente) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : docente1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:DocenteReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.docente1);
			} else {
				console.log(await response_json.json());
			}
		} catch(error) {
			console.log(error);
		}
	};
	
	
	
	return (	
		<tr onClick={(event) => onClickTableRow(props.docente1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.docente1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.docente1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.docente1.updated_at} </td>
			<td data-label="Nombre"> {props.docente1.nombre} </td>
			<td data-label="Apellido"> {props.docente1.apellido} </td>
			<td data-label="Fecha Nacimiento"> {props.docente1.fecha_nacimiento} </td>
			<td data-label="Anios Experiencia" style={{textAlign:"center"}}> {props.docente1.anios_experiencia} </td>
			<td data-label="Nota Evaluacion" style={{textAlign:"center"}}> {props.docente1.nota_evaluacion} </td>
		</tr>	
	);
}

export {DocenteTableRowDataComp};
