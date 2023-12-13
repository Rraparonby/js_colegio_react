
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import type {AlumnoReturnView} from '@/lib/estructura/alumno/application/util/return/AlumnoReturnView';

import type {AlumnoCreateRequest} from '@/lib/estructura/alumno/application/util/request/AlumnoCreateRequest';
import type {AlumnoUpdateRequest} from '@/lib/estructura/alumno/application/util/request/AlumnoUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :AlumnoReturnView => {

	let alumnoReturnView1:AlumnoReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoReturnView = await response_json.json();
			
			alumnoReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return alumnoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,alumno1: Alumno) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let alumnoReturnView1:AlumnoReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : alumno1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoReturnView = await response_json.json();
			
			alumnoReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.alumno1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return alumnoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, alumno: Alumno) => {
	//mostrarLoader();	
	
	let alumnoReturnView1:AlumnoReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:AlumnoCreateRequest = {
		created_at : alumno.created_at,
		updated_at : alumno.updated_at,
		nombre : alumno.nombre,
		apellido : alumno.apellido,
		fecha_nacimiento : alumno.fecha_nacimiento,
	};
	
	var data_json = { 
		alumno: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoReturnView = await response_json.json();
			
			alumnoReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return alumnoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, alumno: Alumno) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let alumnoReturnView1:AlumnoReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:AlumnoUpdateRequest = {
		id : Number(alumno.id),	
		created_at : alumno.created_at,					
		updated_at : alumno.updated_at,																
		nombre : alumno.nombre,																
		apellido : alumno.apellido,																
		fecha_nacimiento : alumno.fecha_nacimiento,					
	};
	
	var data_json = { 
		alumno: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoReturnView = await response_json.json();
			
			alumnoReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return alumnoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, alumno: Alumno) => {
	let alumnoReturnView1:AlumnoReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = alumno.id;*/
	
	var id_json = { 
		id: alumno.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:AlumnoReturnView = await response_json.json();
			
			alumnoReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return alumnoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};



export {procesarTodosDatosData,
		onClickTableRowData,
		nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		};
