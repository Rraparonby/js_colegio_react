import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';
import {DocenteMateriaReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaReturnView';

/*------------------ BUSCAR GENERAL ----------------------*/
import '@/scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '@/scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '@/scss/responsive/form/form_buscar_general_responsive.scss';

type PropsDocenteMateriaSearchComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function DocenteMateriaSearchCompBase(props: PropsDocenteMateriaSearchComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Docente Materia");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [docente_materias,setdocente_materias] = useState(new Array<DocenteMateria>());
	
	let pagination2 = new Pagination();
	
	const updated_docente_materias = () => {
		props.updateDatosView(docente_materias);
	};
	
	useEffect(updated_docente_materias,[docente_materias]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(docente_materias);
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
				const data:DocenteMateriaReturnView = await response_json.json();
				
				setdocente_materias(data.docente_materias);
				
				//docente_materias = data.docente_materias;
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
		//props.updateDatosView(docente_materias);
	};
	
	const siguientes = async () => {
		
		if(docente_materias != null && docente_materias.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();		
		//props.updateDatosView(docente_materias);
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
				const data:DocenteMateriaReturnView = await response_json.json();

				setdocente_materias(data.docente_materias);
					docente_materias = data.docente_materias;
				} else {
					console.log(await response_json.json());
				}

		} catch(error) {

			console.log(error);

		}
	};

	const buscar_FK_Idmateria = () => {
		//mostrarLoader()

		getPaginationInicializar();

		setAccion_busqueda('FK_Idmateria');

		procesar_FK_Idmateria();
	};

	const procesar_FK_Idmateria = async () => {

		let url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + "_FK_Idmateria");

		const data_json = { 
			pagination : pagination1
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {
				const data:DocenteMateriaReturnView = await response_json.json();

				setdocente_materias(data.docente_materias);
					docente_materias = data.docente_materias;
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
	
	<div id="div_docente_materia_form_buscar" className="div_buscar_general">
			
		<div className="tabs_general">

			<button className="tab_button" 
					onClick={(e) => mostrarTabActual(e,'div_FK_Iddocente')}>FK_Iddocente</button>
			<button className="tab_button" 
					onClick={(e) => mostrarTabActual(e,'div_FK_Idmateria')}>FK_Idmateria</button>

		</div>

					
		<div id="div_FK_Iddocente" className="tab_item">
			<form id="docente_materia_FK_Iddocente_form_buscar" className="form_buscar_general">
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
					
		<div id="div_FK_Idmateria" className="tab_item">
			<form id="docente_materia_FK_Idmateria_form_buscar" className="form_buscar_general">
				<label htmlFor="id_materia_FK_Idmateria"> Materia</label>
				<input 	type="text" id="id_materia_FK_Idmateria" name="id_materia_FK_Idmateria" 
						placeholder=" Materia"/>				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Idmateria" name="buscar_button_FK_Idmateria" 
						value="Buscar" className="button_general" 
						onClick={buscar_FK_Idmateria}>
					<i className="fa fa-fw fa-search"></i>
					Buscar
				</button>
				
			</form>
		</div>
</div>
	
	);
}

let DocenteMateriaSearchComp = forwardRef(DocenteMateriaSearchCompBase);

export {DocenteMateriaSearchCompBase,DocenteMateriaSearchComp};
