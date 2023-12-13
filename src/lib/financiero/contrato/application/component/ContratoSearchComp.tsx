import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';
import {ContratoReturnView} from '@/lib/financiero/contrato/application/util/return/ContratoReturnView';

/*------------------ BUSCAR GENERAL ----------------------*/
import '@/scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '@/scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '@/scss/responsive/form/form_buscar_general_responsive.scss';

type PropsContratoSearchComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function ContratoSearchCompBase(props: PropsContratoSearchComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Contrato");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [contratos,setcontratos] = useState(new Array<Contrato>());
	
	let pagination2 = new Pagination();
	
	const updated_contratos = () => {
		props.updateDatosView(contratos);
	};
	
	useEffect(updated_contratos,[contratos]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(contratos);
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
				const data:ContratoReturnView = await response_json.json();
				
				setcontratos(data.contratos);
				
				//contratos = data.contratos;
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
		//props.updateDatosView(contratos);
	};
	
	const siguientes = async () => {
		
		if(contratos != null && contratos.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();		
		//props.updateDatosView(contratos);
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
		
	

	const buscar_FK_Iddocenteid = () => {
		//mostrarLoader()

		getPaginationInicializar();

		setAccion_busqueda('FK_Iddocenteid');

		procesar_FK_Iddocenteid();
	};

	const procesar_FK_Iddocenteid = async () => {

		let url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + "_FK_Iddocenteid");

		const data_json = { 
			pagination : pagination1
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {
				const data:ContratoReturnView = await response_json.json();

				setcontratos(data.contratos);
					contratos = data.contratos;
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
	
	<div id="div_contrato_form_buscar" className="div_buscar_general">
			
		<div className="tabs_general">

			<button className="tab_button" 
					onClick={(e) => mostrarTabActual(e,'div_FK_Iddocenteid')}>FK_Iddocenteid</button>

		</div>

					
		<div id="div_FK_Iddocenteid" className="tab_item">
			<form id="contrato_FK_Iddocenteid_form_buscar" className="form_buscar_general">
				<label htmlFor="ConstantesSql.ID_FK_Iddocenteid"></label>
				<input 	type="text" id="ConstantesSql.ID_FK_Iddocenteid" name="ConstantesSql.ID_FK_Iddocenteid" 
						placeholder=""/>				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Iddocenteid" name="buscar_button_FK_Iddocenteid" 
						value="Buscar" className="button_general" 
						onClick={buscar_FK_Iddocenteid}>
					<i className="fa fa-fw fa-search"></i>
					Buscar
				</button>
				
			</form>
		</div>
</div>
	
	);
}

let ContratoSearchComp = forwardRef(ContratoSearchCompBase);

export {ContratoSearchCompBase,ContratoSearchComp};
