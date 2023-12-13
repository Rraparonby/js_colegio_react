import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';

import {HeaderComp} from '@/lib/base/application/component/HeaderComp';
import {FooterComp} from '@/lib/base/application/component/FooterComp';
import {AlertComp} from '@/lib/base/application/component/AlertComp';

import {AlumnoSearchComp} from '@/lib/estructura/alumno/application/component/AlumnoSearchComp';
import {AlumnoTableDataComp} from '@/lib/estructura/alumno/application/component/AlumnoTableDataComp';
import {AlumnoFormComp} from '@/lib/estructura/alumno/application/component/AlumnoFormComp';

/*------------------ TITLE GENERAL ----------------------*/
import '@/scss/components/title/titulo_general.scss';

function AlumnoView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const alumnoSearchComp1:any = useRef();
	const alumnoFormComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Alumno');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('alumno_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [alumnos,setalumnos] = useState(new Array<Alumno>());
	let [alumno] = useState(new Alumno()); //,setalumno
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (alumnos1:Array<Alumno>) => {
		setalumnos(alumnos1);		
		//alumnos = alumnos1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		alumnoSearchComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		alumnoSearchComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		alumnoSearchComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		alumnoFormComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (alumno1: Alumno) => {
		alumnoFormComp1.current.handleAction_ClickTableRow(alumno1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		alumnoSearchComp1.current.getTodosDatos();
		alumnoFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		alumnoSearchComp1.current.getTodosDatos();
		alumnoFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		alumnoSearchComp1.current.getTodosDatos();
		alumnoFormComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalalumno">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<AlumnoSearchComp ref={alumnoSearchComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<AlumnoTableDataComp 
					module={module} controller={controller}
					alumnos={alumnos}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<AlumnoFormComp ref={alumnoFormComp1}
					module={module} controller={controller}
					alumno={alumno}
					alumnos={alumnos}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {AlumnoView};
