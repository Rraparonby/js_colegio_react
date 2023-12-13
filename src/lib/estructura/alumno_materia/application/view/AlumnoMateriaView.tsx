import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';

import {HeaderComp} from '@/lib/base/application/component/HeaderComp';
import {FooterComp} from '@/lib/base/application/component/FooterComp';
import {AlertComp} from '@/lib/base/application/component/AlertComp';

import {AlumnoMateriaSearchComp} from '@/lib/estructura/alumno_materia/application/component/AlumnoMateriaSearchComp';
import {AlumnoMateriaTableDataComp} from '@/lib/estructura/alumno_materia/application/component/AlumnoMateriaTableDataComp';
import {AlumnoMateriaFormComp} from '@/lib/estructura/alumno_materia/application/component/AlumnoMateriaFormComp';

/*------------------ TITLE GENERAL ----------------------*/
import '@/scss/components/title/titulo_general.scss';

function AlumnoMateriaView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const alumno_materiaSearchComp1:any = useRef();
	const alumno_materiaFormComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Alumno Materia');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('alumno_materia_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [alumno_materias,setalumno_materias] = useState(new Array<AlumnoMateria>());
	let [alumno_materia] = useState(new AlumnoMateria()); //,setalumno_materia
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (alumno_materias1:Array<AlumnoMateria>) => {
		setalumno_materias(alumno_materias1);		
		//alumno_materias = alumno_materias1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		alumno_materiaSearchComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		alumno_materiaSearchComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		alumno_materiaSearchComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		alumno_materiaFormComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (alumno_materia1: AlumnoMateria) => {
		alumno_materiaFormComp1.current.handleAction_ClickTableRow(alumno_materia1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		alumno_materiaSearchComp1.current.getTodosDatos();
		alumno_materiaFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		alumno_materiaSearchComp1.current.getTodosDatos();
		alumno_materiaFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		alumno_materiaSearchComp1.current.getTodosDatos();
		alumno_materiaFormComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalalumno_materia">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<AlumnoMateriaSearchComp ref={alumno_materiaSearchComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<AlumnoMateriaTableDataComp 
					module={module} controller={controller}
					alumno_materias={alumno_materias}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<AlumnoMateriaFormComp ref={alumno_materiaFormComp1}
					module={module} controller={controller}
					alumno_materia={alumno_materia}
					alumno_materias={alumno_materias}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {AlumnoMateriaView};
