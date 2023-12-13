import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';
import {DocenteMateriaReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaReturnView';

import {DocenteMateriaTableRowDataComp} from '@/lib/estructura/docente_materia/application/component/DocenteMateriaTableRowDataComp';

/*------------------ GENERAL ----------------------*/
//import "@/scss/general.scss";
/*------------------ BUTTON GENERAL ----------------------*/
import '@/scss/components/button/button_general.scss';
/*------------------ TABLE GENERAL ----------------------*/
import '@/scss/components/table/table_general.scss';
/*------------------ FORM PAGINATION GENERAL ----------------------*/
import '@/scss/components/form/pagination_form_general.scss';
/*------------------ FORM ACTIONS GENERAL ----------------------*/
import '@/scss/components/form/actions_form_general.scss';


/*------------------ RESPONSIVE TABLE GENERAL ----------------------*/
import '@/scss/responsive/table/table_general_responsive.scss';
/*------------------ RESPONSIVE ACTIONS GENERAL ----------------------*/
import '@/scss/responsive/form/actions_form_general_responsive.scss';
/*------------------ RESPONSIVE FORM PAGINATION GENERAL ----------------------*/
import '@/scss/responsive/form/pagination_form_general_responsive.scss';

type PropsDocenteMateriaTableDataComp = {
	module: string,
	controller: string,
	docente_materias: Array<DocenteMateria>,
	getTodosDatosView: Function,
	anterioresView: Function,
	siguientesView: Function,
	nuevoPrepararView: Function,
	handleAction_ClickTableRowView:Function
};

function DocenteMateriaTableDataComp(props: PropsDocenteMateriaTableDataComp): JSX.Element {	
	let navigate = useNavigate();
	
	//name: 'TablaDatosdocente_materiaComp',
	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		
		//------------------ DATOS ----------------------
		docente_materias:Array
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Tabla Datos Docente Materia")
	
	//------------------ ACCIONES -------------------
	//let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR)
	
	//------------------ ESTILOS -------------------
	let [style_id_column] = useState({}); //,setStyle_id_column
				
	const home = () => {		
		navigate('../main', {replace: true});
	};
		
	const atras = () => {
		window.history.back();
	};
	
	const getTodosDatos = () => {
		props.getTodosDatosView();
	};
	
	const anteriores = () => {
		props.anterioresView();
	};
	
	const siguientes = () => {
		props.siguientesView();
	};
	
	const nuevoPreparar = () => {
		props.nuevoPrepararView();
	};
	
	const handleAction_ClickTableRowTableView = async (docente_materia1:DocenteMateria) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		props.handleAction_ClickTableRowView(docente_materia1);
		
	}
		
	return (
	
	<div id="divCompGlobalTabladocente_materia">
		
	<div id="div_docente_materia_tabla_general">					
		
		<input type="hidden" id="docente_materia_tabla_general_length" name="docente_materia_tabla_general_length" 
				value="{docente_materias.length}"/>
		
		<table id="docente_materia_tabla_general" className="table_general">
			
			<thead>
				<tr>					
					<th style={props.style_id_column}>Id</th>
					<th style={{display:"none"}}>Created At</th>
					<th style={{display:"none"}}>Updated At</th>
					<th> Docente</th>
					<th> Materia</th>
				</tr>
			</thead>
			
			<tbody>
				{props.docente_materias.map((docente_materia1:DocenteMateria) => {
                    return [
						<DocenteMateriaTableRowDataComp 
							key={docente_materia1.id}
							module={props.module}
							controller={props.controller}
							style_id_column={style_id_column}
							docente_materia1={docente_materia1} 
							handleAction_ClickTableRowTableView={(e) => handleAction_ClickTableRowTableView(docente_materia1)} >
							
						</DocenteMateriaTableRowDataComp>				
					]
                })}
			</tbody>
			
		</table>
	</div>
	
	
	<div id="div_docente_materia_pagination_form_general">
		
		<form id="docente_materia_pagination_form_general" className="pagination_form_general">							
			
			<button type="button" id="anteriores_button" name="anteriores_button" 
					value="Anteriores" className="button_general" 
					onClick={anteriores}>
				<i className="fa fa-fw fa-arrow-alt-circle-left"></i>
				Anteriores
			</button>
			
			<button type="button" id="siguientes_button" name="siguientes_button" 
					value="Siguientes" className="button_general" 
					onClick={siguientes}>
				<i className="fa fa-fw fa-arrow-alt-circle-right"></i>
				Siguientes
			</button>
			
		</form>
	</div>
	
	<div id="div_docente_materia_actions_general">
	
		<form id="docente_materia_actions_general" className="actions_form_general">
			
			<button type="button" id="home_button" name="home_button"
					value="Home" className="button_general"
					onClick={home}>
				<i className="fa fa-fw fa-home"></i>
				Home
			</button>
			
			<button type="button" id="atras_button" name="atras_button" 
					value="Atras" className="button_general" 
					onClick={atras}>
				<i className="fa fa-fw fa-arrow-circle-left"></i>
				Atras
			</button>
			
			<button type="button" id="recargar_button" name="recargar_button" 
					value="Recargar" className="button_general" 
					onClick={getTodosDatos}>
				<i className="fa fa-fw fa-sync"></i>
				Recargar
			</button>
			
			<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
					value="Nuevo" className="button_general" 
					onClick={nuevoPreparar}>
				<i className="fa fa-fw fa-plus-circle"></i>
				Nuevo
			</button>
			
		</form>
	</div>		
</div>

	
	);
}

export {DocenteMateriaTableDataComp};
