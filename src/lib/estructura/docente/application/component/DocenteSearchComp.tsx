import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import {DocenteReturnView} from '@/lib/estructura/docente/application/util/return/DocenteReturnView';

/*------------------ BUSCAR GENERAL ----------------------*/
import '@/scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '@/scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '@/scss/responsive/form/form_buscar_general_responsive.scss';

type PropsDocenteSearchComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function DocenteSearchCompBase(props: PropsDocenteSearchComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Docente");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [docentes,setdocentes] = useState(new Array<Docente>());
	
	let pagination2 = new Pagination();
	
	const updated_docentes = () => {
		props.updateDatosView(docentes);
	};
	
	useEffect(updated_docentes,[docentes]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(docentes);
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
				const data:DocenteReturnView = await response_json.json();
				
				setdocentes(data.docentes);
				
				//docentes = data.docentes;
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
		//props.updateDatosView(docentes);
	};
	
	const siguientes = async () => {
		
		if(docentes != null && docentes.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();		
		//props.updateDatosView(docentes);
	};
	
	const procesarBuscar = async () => {
		
		if(accion_busqueda === 'todos') {
			await procesarTodosDatos();
			
		} else if(accion_busqueda === 'buscar') {
			//await getBuscarGeneralDatos();
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
	
	<div id="div_docente_form_buscar" className="div_buscar_general">
			
		<div className="tabs_general">


		</div>

</div>
	
	);
}

let DocenteSearchComp = forwardRef(DocenteSearchCompBase);

export {DocenteSearchCompBase,DocenteSearchComp};
