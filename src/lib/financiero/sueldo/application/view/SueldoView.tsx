import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Sueldo} from '@/lib/financiero/sueldo/domain/entity/Sueldo';

import {HeaderComp} from '@/lib/base/application/component/HeaderComp';
import {FooterComp} from '@/lib/base/application/component/FooterComp';
import {AlertComp} from '@/lib/base/application/component/AlertComp';

import {SueldoSearchComp} from '@/lib/financiero/sueldo/application/component/SueldoSearchComp';
import {SueldoTableDataComp} from '@/lib/financiero/sueldo/application/component/SueldoTableDataComp';
import {SueldoFormComp} from '@/lib/financiero/sueldo/application/component/SueldoFormComp';

/*------------------ TITLE GENERAL ----------------------*/
import '@/scss/components/title/titulo_general.scss';

function SueldoView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const sueldoSearchComp1:any = useRef();
	const sueldoFormComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Sueldo');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('financiero');
	const [controller] = useState('sueldo_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [sueldos,setsueldos] = useState(new Array<Sueldo>());
	let [sueldo] = useState(new Sueldo()); //,setsueldo
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (sueldos1:Array<Sueldo>) => {
		setsueldos(sueldos1);		
		//sueldos = sueldos1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		sueldoSearchComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		sueldoSearchComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		sueldoSearchComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		sueldoFormComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (sueldo1: Sueldo) => {
		sueldoFormComp1.current.handleAction_ClickTableRow(sueldo1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		sueldoSearchComp1.current.getTodosDatos();
		sueldoFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		sueldoSearchComp1.current.getTodosDatos();
		sueldoFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		sueldoSearchComp1.current.getTodosDatos();
		sueldoFormComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalsueldo">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<SueldoSearchComp ref={sueldoSearchComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<SueldoTableDataComp 
					module={module} controller={controller}
					sueldos={sueldos}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<SueldoFormComp ref={sueldoFormComp1}
					module={module} controller={controller}
					sueldo={sueldo}
					sueldos={sueldos}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {SueldoView};
