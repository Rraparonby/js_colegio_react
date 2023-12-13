import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';
import {NotaReturnView} from '@/lib/proceso/nota/application/util/return/NotaReturnView';

type PropsNotaTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	nota1: Nota,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function NotaTableRowDataComp(props: PropsNotaTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (nota1:Nota) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : nota1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:NotaReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.nota1);
			} else {
				console.log(await response_json.json());
			}
		} catch(error) {
			console.log(error);
		}
	};
	
	
	
	return (	
		<tr onClick={(event) => onClickTableRow(props.nota1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.nota1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.nota1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.nota1.updated_at} </td>
			<td data-label=" Alumno"> {props.nota1.alumno!.nombre} </td>
			<td data-label=" Materia"> {props.nota1.materia!.codigo} </td>
			<td data-label=" Docente"> {props.nota1.docente!.nombre} </td>
			<td data-label="Nota Prueba" style={{textAlign:"center"}}> {props.nota1.nota_prueba} </td>
			<td data-label="Nota Trabajo" style={{textAlign:"center"}}> {props.nota1.nota_trabajo} </td>
			<td data-label="Nota Examen" style={{textAlign:"center"}}> {props.nota1.nota_examen} </td>
			<td data-label="Nota Final" style={{textAlign:"center"}}> {props.nota1.nota_final} </td>
		</tr>	
	);
}

export {NotaTableRowDataComp};
