import React,{useState,forwardRef,useImperativeHandle} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import {MateriaReturnView} from '@/lib/estructura/materia/application/util/return/MateriaReturnView';


import {MateriaCreateRequest} from '@/lib/estructura/materia/application/util/request/MateriaCreateRequest';
import {MateriaUpdateRequest} from '@/lib/estructura/materia/application/util/request/MateriaUpdateRequest';

import {nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		} from '@/lib/estructura/materia/infrastructure/data/MateriaData';

/*FKs*/



/*------------------ BUTTON GENERAL ----------------------*/
import '@/scss/components/button/button_general.scss';
/*------------------ FORM GENERAL ----------------------*/
import '@/scss/components/form/form_general.scss';
/*------------------ FORM ACTIONS GENERAL ----------------------*/
import '@/scss/components/form/actions_form_general.scss';
/*------------------ FORM MODAL GENERAL ----------------------*/
import '@/scss/components/form/modal_form_general.scss';


/*------------------ RESPONSIVE FORM GENERAL ----------------------*/
import '@/scss/responsive/form/form_general_responsive.scss';
/*------------------ RESPONSIVE ACTIONS GENERAL ----------------------*/
import '@/scss/responsive/form/actions_form_general_responsive.scss';


type PropsMateriaFormComp = {
	module: string,
	controller: string,
	materia: Materia,
	materias: Array<Materia>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function MateriaFormCompBase(props: PropsMateriaFormComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'FormulariomateriaComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		materias:Array,
		materia:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Materia")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [materia,setmateria] = useState(new Materia());
	
	
			
	const setid = (id:number) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.id=id;	setmateria(materia2);};
	const setcreated_at = (created_at:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.created_at=created_at;	setmateria(materia2);};
	const setupdated_at = (updated_at:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.updated_at=updated_at;	setmateria(materia2);};
	const setcodigo = (codigo:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.codigo=codigo;	setmateria(materia2);};
	const setnombre = (nombre:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.nombre=nombre;	setmateria(materia2);};
	const setactivo = (activo:boolean) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.activo=activo;	setmateria(materia2);};
	
	const home = () => {		
		navigate('../main', {replace: true});
	};		
	
	const nuevoPreparar = () => {	
		
		setTipo_accion(Constantes.NUEVO);	
		abrirModalFormGeneral();		
		props.ocultarMensajeAlertaView();
		//this.ocultarMensajeAlerta();
		
		/*setId(-1);*/
		setText_id_aux('-1');
		
		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setcodigo('');
		setnombre('');
		setactivo(false);
	};
	
	const cancelar = () => {			
		setTipo_accion(Constantes.CANCELAR);
		cerrarModalFormGeneral();
	};
	
	const abrirModalFormGeneral = () => {
		setDisplay('block');
	};
	
	const cerrarModalFormGeneral = () => {
		setDisplay('none');
	};
	
	const showConfirm = (mensaje:string) => {
		return window.confirm(mensaje);
	};
	
	const handleAction_ClickTableRow = (data_json:Materia) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		materia.id = Number(data_json.id);
		materia.created_at = data_json.created_at;
		materia.updated_at = data_json.updated_at;
		materia.codigo = data_json.codigo;
		materia.nombre = data_json.nombre;
		materia.activo = data_json.activo;
	};
	
	const actualizar = () => {	
		
		if(tipo_accion === Constantes.NUEVO) {
			nuevoDatos();			
			
		} else if(tipo_accion === Constantes.SELECCIONAR) {
			actualizarDatos();
			
		} else if(tipo_accion === Constantes.ELIMINAR) {
			eliminarDatos();
		}
	};
	
	const eliminar = () => {
		
		setTipo_accion(Constantes.ELIMINAR);
		tipo_accion = Constantes.ELIMINAR;
		
		if (showConfirm(Constantes.MENSAJE_ELIMINAR_SINO)) {
			actualizar();
		}
	};
	
	const nuevoDatos = async () => {
		
		const data_json:MateriaReturnView = await nuevoDatosData(props.module,props.controller,materia);
		
		props.handleAction_NuevoDatosView(data_json);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		const data_json:MateriaReturnView = await actualizarDatosData(props.module,props.controller,materia);
		
		props.handleAction_ActualizarDatosView(data_json);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		
		const data_json:MateriaReturnView = await eliminarDatosData(props.module,props.controller,materia);
		
		props.handleAction_EliminarDatosView(data_json);
	};
	
		
	const funUseImperativeHandle = () => ({
        home,
		nuevoPreparar,
		cancelar,
		abrirModalFormGeneral,
		cerrarModalFormGeneral,
		showConfirm,
		handleAction_ClickTableRow,
		actualizar,
		eliminar,
		nuevoDatos,
		actualizarDatos,
		eliminarDatos
    });
	
	useImperativeHandle(ref,funUseImperativeHandle);
	
	//<!-- The Modal -->
	//<!-- Modal content -->
	
	
	return (
	
	<div id="divModal_materia_form_general" 
		className="modal_form_general"
		style={{display : display}}>
			
	<div id="divModalContent_materia_form_general" 
		className="modal_form_general_content">
		
		<div className="modal_form_general_header">
			
			<span id="spanCloseModal_materia_form_general"
					className="close_modal_form_general" 
					onClick={cerrarModalFormGeneral}>
				&times;
			</span>
			<h2>
				Materia
			</h2>
			
		</div>
		
		<div className="modal_form_general_body">
		
			<div id="div_materia_form_general">
			
				<form id="materia_form_general" 
					className="form_general">

					<input type="hidden" id="id" name="id" 
							value={materia.id}
							onChange={(e) => setid(Number(e.target.value))}/>
					
					<label id="label_id" htmlFor="text_id_aux"								
							className="" style={style_id_column}>Id</label>				
					<input type="text" id="text_id_aux" name="text_id_aux" placeholder="Id"
							style={style_id_column} className=""
							value={text_id_aux} readOnly/>
					
					<label id="label_created_at" htmlFor="created_at"
							className="" style={{display:"none"}}>created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							style={{display:"none"}} className=""
							value={materia.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)} />
							
					<label id="label_updated_at" htmlFor="updated_at"
							className="" style={{display:"none"}}>updated_at</label>				
					<input type="text" id="updated_at" name="updated_at" 
							style={{display:"none"}} className=""
							value={materia.updated_at} placeholder="updated_at" 
							onChange={(e) => setupdated_at(e.target.value)} />
							
					
					<label htmlFor="codigo" className="">Codigo</label>
					<input type="text" id="codigo" name="codigo" 
							className="" placeholder="Codigo"
							value={materia.codigo}
							onChange={(e) => setcodigo(e.target.value)}/>
													
					
					<label htmlFor="nombre" className="">Nombre</label>
					<input type="text" id="nombre" name="nombre" 
							className="" placeholder="Nombre"
							value={materia.nombre}
							onChange={(e) => setnombre(e.target.value)}/>
													
					
					<label htmlFor="activo" className="">Activo</label>
					<input type="checkbox" id="activo" name="activo"
							className="" placeholder="Activo"
							checked={materia.activo}
							onChange={(e) => setactivo(Boolean(e.target.checked))}/>
						
									
				</form>
				
			</div>
			
			<div id="div_materia_actions_form_general">
				
				<form id="materia_actions_form_general" 
					className="actions_form_general">				
					
					<button type="button" id="actualizar_button" name="actualizar_button" 
							className="button_general" value="Actualizar" 
							onClick={actualizar}>
						<i className="fa fa-fw fa-save"></i>
						Actualizar
					</button>
					
					<button type="button" id="eliminar_button" name="eliminar_button" 
							className="button_general" value="Eliminar" 
							onClick={eliminar}>
						<i className="fa fa-fw fa-times-circle"></i>
						Eliminar
					</button>
					
					<button type="button" id="cancelar_button" name="cancelar_button" 
							className="button_general" value="Cancelar"
							onClick={cancelar}>
						<i className="fa fa-fw fa-minus-circle"></i>
						Cancelar
					</button>
					
				</form>
				
			</div>
			
		</div>
		
	</div>
	
</div>
	
	);
}

let MateriaFormComp = forwardRef(MateriaFormCompBase);

export {MateriaFormComp,MateriaFormCompBase};
