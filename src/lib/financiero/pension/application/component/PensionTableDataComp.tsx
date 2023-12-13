import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Pension} from '@/lib/financiero/pension/domain/entity/Pension';
import {PensionReturnView} from '@/lib/financiero/pension/application/util/return/PensionReturnView';

import {PensionTableRowDataComp} from '@/lib/financiero/pension/application/component/PensionTableRowDataComp';

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

type PropsPensionTableDataComp = {
	module: string,
	controller: string,
	pensions: Array<Pension>,
	getTodosDatosView: Function,
	anterioresView: Function,
	siguientesView: Function,
	nuevoPrepararView: Function,
	handleAction_ClickTableRowView:Function
};

function PensionTableDataComp(props: PropsPensionTableDataComp): JSX.Element {	
	let navigate = useNavigate();
	
	//name: 'TablaDatospensionComp',
	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		
		//------------------ DATOS ----------------------
		pensions:Array
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Tabla Datos Pension")
	
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
	
	const handleAction_ClickTableRowTableView = async (pension1:Pension) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		props.handleAction_ClickTableRowView(pension1);
		
	}
		
	return (
	
	<div id="divCompGlobalTablapension">
		
	<div id="div_pension_tabla_general">					
		
		<input type="hidden" id="pension_tabla_general_length" name="pension_tabla_general_length" 
				value="{pensions.length}"/>
		
		<table id="pension_tabla_general" className="table_general">
			
			<thead>
				<tr>					
					<th style={props.style_id_column}>Id</th>
					<th style={{display:"none"}}>Created At</th>
					<th style={{display:"none"}}>Updated At</th>
					<th> Alumno</th>
					<th style={{textAlign:"center"}}>Anio</th>
					<th style={{textAlign:"center"}}>Mes</th>
					<th style={{textAlign:"center"}}>Valor</th>
					<th style={{textAlign:"center"}}>Cobrado</th>
				</tr>
			</thead>
			
			<tbody>
				{props.pensions.map((pension1:Pension) => {
                    return [
						<PensionTableRowDataComp 
							key={pension1.id}
							module={props.module}
							controller={props.controller}
							style_id_column={style_id_column}
							pension1={pension1} 
							handleAction_ClickTableRowTableView={(e) => handleAction_ClickTableRowTableView(pension1)} >
							
						</PensionTableRowDataComp>				
					]
                })}
			</tbody>
			
		</table>
	</div>
	
	
	<div id="div_pension_pagination_form_general">
		
		<form id="pension_pagination_form_general" className="pagination_form_general">							
			
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
	
	<div id="div_pension_actions_general">
	
		<form id="pension_actions_general" className="actions_form_general">
			
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

export {PensionTableDataComp};
