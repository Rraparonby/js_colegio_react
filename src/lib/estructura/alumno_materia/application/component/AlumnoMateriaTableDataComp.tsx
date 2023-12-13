import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';
import {AlumnoMateriaReturnView} from '@/lib/estructura/alumno_materia/application/util/return/AlumnoMateriaReturnView';

import {AlumnoMateriaTableRowDataComp} from '@/lib/estructura/alumno_materia/application/component/AlumnoMateriaTableRowDataComp';

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

type PropsAlumnoMateriaTableDataComp = {
	module: string,
	controller: string,
	alumno_materias: Array<AlumnoMateria>,
	getTodosDatosView: Function,
	anterioresView: Function,
	siguientesView: Function,
	nuevoPrepararView: Function,
	handleAction_ClickTableRowView:Function
};

function AlumnoMateriaTableDataComp(props: PropsAlumnoMateriaTableDataComp): JSX.Element {	
	let navigate = useNavigate();
	
	//name: 'TablaDatosalumno_materiaComp',
	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		
		//------------------ DATOS ----------------------
		alumno_materias:Array
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Tabla Datos Alumno Materia")
	
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
	
	const handleAction_ClickTableRowTableView = async (alumno_materia1:AlumnoMateria) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		props.handleAction_ClickTableRowView(alumno_materia1);
		
	}
		
	return (
	
	<div id="divCompGlobalTablaalumno_materia">
		
	<div id="div_alumno_materia_tabla_general">					
		
		<input type="hidden" id="alumno_materia_tabla_general_length" name="alumno_materia_tabla_general_length" 
				value="{alumno_materias.length}"/>
		
		<table id="alumno_materia_tabla_general" className="table_general">
			
			<thead>
				<tr>					
					<th style={props.style_id_column}>Id</th>
					<th style={{display:"none"}}>Created At</th>
					<th style={{display:"none"}}>Updated At</th>
					<th> Alumno</th>
					<th> Materia</th>
				</tr>
			</thead>
			
			<tbody>
				{props.alumno_materias.map((alumno_materia1:AlumnoMateria) => {
                    return [
						<AlumnoMateriaTableRowDataComp 
							key={alumno_materia1.id}
							module={props.module}
							controller={props.controller}
							style_id_column={style_id_column}
							alumno_materia1={alumno_materia1} 
							handleAction_ClickTableRowTableView={(e) => handleAction_ClickTableRowTableView(alumno_materia1)} >
							
						</AlumnoMateriaTableRowDataComp>				
					]
                })}
			</tbody>
			
		</table>
	</div>
	
	
	<div id="div_alumno_materia_pagination_form_general">
		
		<form id="alumno_materia_pagination_form_general" className="pagination_form_general">							
			
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
	
	<div id="div_alumno_materia_actions_general">
	
		<form id="alumno_materia_actions_general" className="actions_form_general">
			
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

export {AlumnoMateriaTableDataComp};
