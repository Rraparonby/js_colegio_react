
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import type {DocenteReturnView} from '@/lib/estructura/docente/application/util/return/DocenteReturnView';

import type {DocenteCreateRequest} from '@/lib/estructura/docente/application/util/request/DocenteCreateRequest';
import type {DocenteUpdateRequest} from '@/lib/estructura/docente/application/util/request/DocenteUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :DocenteReturnView => {

	let docenteReturnView1:DocenteReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteReturnView = await response_json.json();
			
			docenteReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return docenteReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,docente1: Docente) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let docenteReturnView1:DocenteReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : docente1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteReturnView = await response_json.json();
			
			docenteReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.docente1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return docenteReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, docente: Docente) => {
	//mostrarLoader();	
	
	let docenteReturnView1:DocenteReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:DocenteCreateRequest = {
		created_at : docente.created_at,
		updated_at : docente.updated_at,
		nombre : docente.nombre,
		apellido : docente.apellido,
		fecha_nacimiento : docente.fecha_nacimiento,
		anios_experiencia : docente.anios_experiencia,
		nota_evaluacion : docente.nota_evaluacion,
	};
	
	var data_json = { 
		docente: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteReturnView = await response_json.json();
			
			docenteReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return docenteReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, docente: Docente) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let docenteReturnView1:DocenteReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:DocenteUpdateRequest = {
		id : Number(docente.id),	
		created_at : docente.created_at,					
		updated_at : docente.updated_at,																
		nombre : docente.nombre,																
		apellido : docente.apellido,																
		fecha_nacimiento : docente.fecha_nacimiento,					
		anios_experiencia : docente.anios_experiencia,																
		nota_evaluacion : docente.nota_evaluacion,																
	};
	
	var data_json = { 
		docente: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteReturnView = await response_json.json();
			
			docenteReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return docenteReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, docente: Docente) => {
	let docenteReturnView1:DocenteReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = docente.id;*/
	
	var id_json = { 
		id: docente.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:DocenteReturnView = await response_json.json();
			
			docenteReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return docenteReturnView1;
		
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
