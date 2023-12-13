import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import {Sueldo} from '@/lib/financiero/sueldo/domain/entity/Sueldo';
import {SueldoReturnView} from '@/lib/financiero/sueldo/application/util/return/SueldoReturnView';

/*------------------ BUSCAR GENERAL ----------------------*/
import '@/scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '@/scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '@/scss/responsive/form/form_buscar_general_responsive.scss';

type PropsSueldoSearchComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function SueldoSearchCompBase(props: PropsSueldoSearchComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Sueldo");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [sueldos,setsueldos] = useState(new Array<Sueldo>());
	
	let pagination2 = new Pagination();
	
	const updated_sueldos = () => {
		props.updateDatosView(sueldos);
	};
	
	useEffect(updated_sueldos,[sueldos]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(sueldos);
	};		
	
	const getPaginationInicializar = () => {
		
		pagination2 = new Pagination();
		
		pagination2.skip = 0;
		pagination2.limit = Constantes.LIMIT;
		
		setPagination1(pagination2);
	};
	
	const updatePagination = () => {
		
		pagination2 = new Pagination();

		pagination2.skip = pagination1.skip;
		pagination2.limit = pagination1.limit;

		setPagination1(pagination2);
	};
	
	const procesarTodosDatos = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_TODOS);
			
		const data_json = {
			pagination : pagination1
		};
		
		try {
			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
			
			const response_json = await fetch(url_global_controller, request_options);
			
			if(response_json?.ok) {
				const data:SueldoReturnView = await response_json.json();
				
				setsueldos(data.sueldos);
				
				//sueldos = data.sueldos;
			} else {
				console.log(await response_json.json());
			}
		} catch(error) {
			console.log(error);
		}
	};
	
	const anteriores = async () => {
		
		if(pagination1.skip - pagination1.limit < 0) {
			pagination1.skip = 0;			
		} else {
			pagination1.skip = pagination1.skip - pagination1.limit;
		}
		
		updatePagination();	
		
		await procesarBuscar();			
		//props.updateDatosView(sueldos);
	};
	
	const siguientes = async () => {
		
		if(sueldos != null && sueldos.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();		
		//props.updateDatosView(sueldos);
	};
	
	const procesarBuscar = async () => {
		
		if(accion_busqueda === 'todos') {
			await procesarTodosDatos();
			
		} else if(accion_busqueda === 'buscar') {
			//await getBuscarGeneralDatos();
		}			
	};
	
	const mostrarTabActual = (evt:any,tab1:string) => {
		FuncionGeneral.mostrarTabActual(evt,tab1);
	};
		
	

	const buscar_FK_Iddocente = () => {
		//mostrarLoader()

		getPaginationInicializar();

		setAccion_busqueda('FK_Iddocente');

		procesar_FK_Iddocente();
	};

	const procesar_FK_Iddocente = async () => {

		let url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + "_FK_Iddocente");

		const data_json = { 
			pagination : pagination1
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {
				const data:SueldoReturnView = await response_json.json();

				setsueldos(data.sueldos);
					sueldos = data.sueldos;
				} else {
					console.log(await response_json.json());
				}

		} catch(error) {

			console.log(error);

		}
	};	
	
	const funUseImperativeHandle = () => ({
        getTodosDatos,
		procesarTodosDatos,
		anteriores,
		siguientes,
		procesarBuscar
    });
	
	useImperativeHandle(ref,funUseImperativeHandle);
	
	
	return (
	
	<div id="div_sueldo_form_buscar" className="div_buscar_general">
			
		<div className="tabs_general">

			<button className="tab_button" 
					onClick={(e) => mostrarTabActual(e,'div_FK_Iddocente')}>FK_Iddocente</button>

		</div>

					
		<div id="div_FK_Iddocente" className="tab_item">
			<form id="sueldo_FK_Iddocente_form_buscar" className="form_buscar_general">
				<label htmlFor="id_docente_FK_Iddocente"> Docente</label>
				<input 	type="text" id="id_docente_FK_Iddocente" name="id_docente_FK_Iddocente" 
						placeholder=" Docente"/>				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Iddocente" name="buscar_button_FK_Iddocente" 
						value="Buscar" className="button_general" 
						onClick={buscar_FK_Iddocente}>
					<i className="fa fa-fw fa-search"></i>
					Buscar
				</button>
				
			</form>
		</div>
</div>
	
	);
}

let SueldoSearchComp = forwardRef(SueldoSearchCompBase);

export {SueldoSearchCompBase,SueldoSearchComp};
