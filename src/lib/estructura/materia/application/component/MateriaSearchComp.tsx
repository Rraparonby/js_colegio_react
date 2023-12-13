import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import {MateriaReturnView} from '@/lib/estructura/materia/application/util/return/MateriaReturnView';

import {procesarTodosDatosData} from '@/lib/estructura/materia/infrastructure/data/MateriaData';

/*------------------ BUSCAR GENERAL ----------------------*/
import '@/scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '@/scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '@/scss/responsive/form/form_buscar_general_responsive.scss';

type PropsMateriaSearchComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function MateriaSearchCompBase(props: PropsMateriaSearchComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Materia");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [materias,setmaterias] = useState(new Array<Materia>());
	
	let pagination2 = new Pagination();
	
	const updated_materias = () => {
		props.updateDatosView(materias);
	};
	
	useEffect(updated_materias,[materias]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(materias);
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
		
		const data:MateriaReturnView = await procesarTodosDatosData(props.module,props.controller,pagination1);
		
		setmaterias(data.materias);
		
	};
	
	const anteriores = async () => {
		
		if(pagination1.skip - pagination1.limit < 0) {
			pagination1.skip = 0;			
		} else {
			pagination1.skip = pagination1.skip - pagination1.limit;
		}
		
		updatePagination();	
		
		await procesarBuscar();
		
		//props.updateDatosView(materias);
	};
	
	const siguientes = async () => {
		
		if(materias != null && materias.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();
		
		//props.updateDatosView(materias);
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
	
	<div id="div_materia_form_buscar" className="div_buscar_general">
			
		<div className="tabs_general">


		</div>

</div>
	
	);
}

let MateriaSearchComp = forwardRef(MateriaSearchCompBase);

export {MateriaSearchCompBase,MateriaSearchComp};
