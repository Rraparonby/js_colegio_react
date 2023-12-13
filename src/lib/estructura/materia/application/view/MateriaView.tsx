import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';

import {HeaderComp} from '@/lib/base/application/component/HeaderComp';
import {FooterComp} from '@/lib/base/application/component/FooterComp';
import {AlertComp} from '@/lib/base/application/component/AlertComp';

import {MateriaSearchComp} from '@/lib/estructura/materia/application/component/MateriaSearchComp';
import {MateriaTableDataComp} from '@/lib/estructura/materia/application/component/MateriaTableDataComp';
import {MateriaFormComp} from '@/lib/estructura/materia/application/component/MateriaFormComp';

/*------------------ TITLE GENERAL ----------------------*/
import '@/scss/components/title/titulo_general.scss';

function MateriaView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const materiaSearchComp1:any = useRef();
	const materiaFormComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Materia');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('materia_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [materias,setmaterias] = useState(new Array<Materia>());
	let [materia] = useState(new Materia()); //,setmateria
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (materias1:Array<Materia>) => {
		setmaterias(materias1);		
		//materias = materias1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		materiaSearchComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		materiaSearchComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		materiaSearchComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		materiaFormComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (materia1: Materia) => {
		materiaFormComp1.current.handleAction_ClickTableRow(materia1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		materiaSearchComp1.current.getTodosDatos();
		materiaFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		materiaSearchComp1.current.getTodosDatos();
		materiaFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		materiaSearchComp1.current.getTodosDatos();
		materiaFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ELIMINADO);
		headerComp1.current.ocultarLoader();
	};
	
	const setMensajeAlerta = (tipo_mensaje:string,mensaje:string) => {
		setTipo_mensaje(tipo_mensaje);
		setMensaje(mensaje);
		
		alertComp1.current.setMensajeAlerta();
	};
	
	const funGetTodosDatos = () => {
		getTodosDatos();
	};
	
	useEffect(funGetTodosDatos, []);
	
	return (
	
	<div id="divViewGlobalmateria">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<MateriaSearchComp ref={materiaSearchComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<MateriaTableDataComp 
					module={module} controller={controller}
					materias={materias}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<MateriaFormComp ref={materiaFormComp1}
					module={module} controller={controller}
					materia={materia}
					materias={materias}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {MateriaView};
