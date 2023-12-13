import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';
import {AlumnoMateriaReturnView} from '@/lib/estructura/alumno_materia/application/util/return/AlumnoMateriaReturnView';

type PropsAlumnoMateriaTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	alumno_materia1: AlumnoMateria,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function AlumnoMateriaTableRowDataComp(props: PropsAlumnoMateriaTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (alumno_materia1:AlumnoMateria) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_SELECCIONAR);
	
		var id_json = {
			id : alumno_materia1.id
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			if(response_json?.ok) {
				const data_json:AlumnoMateriaReturnView = await response_json.json();		
				
				props.handleAction_ClickTableRowTableView(data_json.alumno_materia1);
			} else {
				console.log(await response_json.json());
			}
		} catch(error) {
			console.log(error);
		}
	};
	
	
	
	return (	
		<tr onClick={(event) => onClickTableRow(props.alumno_materia1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.alumno_materia1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.alumno_materia1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.alumno_materia1.updated_at} </td>
			<td data-label=" Alumno"> {props.alumno_materia1.alumno!.nombre} </td>
			<td data-label=" Materia"> {props.alumno_materia1.materia!.codigo} </td>
		</tr>	
	);
}

export {AlumnoMateriaTableRowDataComp};
