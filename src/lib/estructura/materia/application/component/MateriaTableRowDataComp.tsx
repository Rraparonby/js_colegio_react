import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import {MateriaReturnView} from '@/lib/estructura/materia/application/util/return/MateriaReturnView';

import {onClickTableRowData} from '@/lib/estructura/materia/infrastructure/data/MateriaData';

type PropsMateriaTableRowDataComp = {
	module: string,
	controller: string,
	style_id_column: string,
	materia1: Materia,
	handleAction_ClickTableRowTableView: Function
	//handleAction_ClickTableRowView:Function
};

function MateriaTableRowDataComp(props: PropsMateriaTableRowDataComp): JSX.Element {							
	
	const onClickTableRow = async (materia1:Materia) => {	
		
		const data_json:MateriaReturnView = await onClickTableRowData(props.module,props.controller,materia1);
		
		props.handleAction_ClickTableRowTableView(data_json.materia1);
	};
	
	

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};
	
	return (	
		<tr onClick={(event) => onClickTableRow(props.materia1)}>						
			<td data-label="Id" style={props.style_id_column}> {props.materia1.id} </td>
			<td data-label="Created At" style={{display:"none"}}> {props.materia1.created_at} </td>
			<td data-label="Updated At" style={{display:"none"}}> {props.materia1.updated_at} </td>
			<td data-label="Codigo"> {props.materia1.codigo} </td>
			<td data-label="Nombre"> {props.materia1.nombre} </td>
			<td data-label="Activo" style={{textAlign:"center"}}> {GetLabelBoolean(props.materia1.activo)} </td>
		</tr>	
	);
}

export {MateriaTableRowDataComp};
