import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';
import {DocenteMateriaReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaReturnView';

type PropsDocenteMateriaTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	docente_materia1: DocenteMateria,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function DocenteMateriaTableRowDataComp(props: PropsDocenteMateriaTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (docente_materia1:DocenteMateria) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : docente_materia1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:DocenteMateriaReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.docente_materia1);
			} else {
				console.log(await response_json.json());
			}
		} catch(error) {
			console.log(error);
		}
	};
	
	
	
	return (	
		<tr onClick={(event) => onClickTableRow(props.docente_materia1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.docente_materia1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.docente_materia1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.docente_materia1.updated_at} </td>
			<td data-label=" Docente"> {props.docente_materia1.docente!.nombre} </td>
			<td data-label=" Materia"> {props.docente_materia1.materia!.codigo} </td>
		</tr>	
	);
}

export {DocenteMateriaTableRowDataComp};
