import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';

import {HeaderComp} from '@/lib/base/application/component/HeaderComp';
import {FooterComp} from '@/lib/base/application/component/FooterComp';
import {AlertComp} from '@/lib/base/application/component/AlertComp';

import {NotaSearchComp} from '@/lib/proceso/nota/application/component/NotaSearchComp';
import {NotaTableDataComp} from '@/lib/proceso/nota/application/component/NotaTableDataComp';
import {NotaFormComp} from '@/lib/proceso/nota/application/component/NotaFormComp';

/*------------------ TITLE GENERAL ----------------------*/
import '@/scss/components/title/titulo_general.scss';

function NotaView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const notaSearchComp1:any = useRef();
	const notaFormComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Nota');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('proceso');
	const [controller] = useState('nota_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [notas,setnotas] = useState(new Array<Nota>());
	let [nota] = useState(new Nota()); //,setnota
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (notas1:Array<Nota>) => {
		setnotas(notas1);		
		//notas = notas1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		notaSearchComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		notaSearchComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		notaSearchComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		notaFormComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (nota1: Nota) => {
		notaFormComp1.current.handleAction_ClickTableRow(nota1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		notaSearchComp1.current.getTodosDatos();
		notaFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		notaSearchComp1.current.getTodosDatos();
		notaFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		notaSearchComp1.current.getTodosDatos();
		notaFormComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalnota">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<NotaSearchComp ref={notaSearchComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<NotaTableDataComp 
					module={module} controller={controller}
					notas={notas}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<NotaFormComp ref={notaFormComp1}
					module={module} controller={controller}
					nota={nota}
					notas={notas}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {NotaView};
