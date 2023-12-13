import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';

import {HeaderComp} from '@/lib/base/application/component/HeaderComp';
import {FooterComp} from '@/lib/base/application/component/FooterComp';
import {AlertComp} from '@/lib/base/application/component/AlertComp';

import {ContratoSearchComp} from '@/lib/financiero/contrato/application/component/ContratoSearchComp';
import {ContratoTableDataComp} from '@/lib/financiero/contrato/application/component/ContratoTableDataComp';
import {ContratoFormComp} from '@/lib/financiero/contrato/application/component/ContratoFormComp';

/*------------------ TITLE GENERAL ----------------------*/
import '@/scss/components/title/titulo_general.scss';

function ContratoView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const contratoSearchComp1:any = useRef();
	const contratoFormComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Contrato');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('financiero');
	const [controller] = useState('contrato_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [contratos,setcontratos] = useState(new Array<Contrato>());
	let [contrato] = useState(new Contrato()); //,setcontrato
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (contratos1:Array<Contrato>) => {
		setcontratos(contratos1);		
		//contratos = contratos1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		contratoSearchComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		contratoSearchComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		contratoSearchComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		contratoFormComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (contrato1: Contrato) => {
		contratoFormComp1.current.handleAction_ClickTableRow(contrato1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		contratoSearchComp1.current.getTodosDatos();
		contratoFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		contratoSearchComp1.current.getTodosDatos();
		contratoFormComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		contratoSearchComp1.current.getTodosDatos();
		contratoFormComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalcontrato">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<ContratoSearchComp ref={contratoSearchComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<ContratoTableDataComp 
					module={module} controller={controller}
					contratos={contratos}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<ContratoFormComp ref={contratoFormComp1}
					module={module} controller={controller}
					contrato={contrato}
					contratos={contratos}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {ContratoView};
