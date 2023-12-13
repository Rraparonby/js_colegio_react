
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Sueldo} from '@/lib/financiero/sueldo/domain/entity/Sueldo';
import type {SueldoReturnView} from '@/lib/financiero/sueldo/application/util/return/SueldoReturnView';

import type {SueldoCreateRequest} from '@/lib/financiero/sueldo/application/util/request/SueldoCreateRequest';
import type {SueldoUpdateRequest} from '@/lib/financiero/sueldo/application/util/request/SueldoUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :SueldoReturnView => {

	let sueldoReturnView1:SueldoReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:SueldoReturnView = await response_json.json();
			
			sueldoReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return sueldoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,sueldo1: Sueldo) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let sueldoReturnView1:SueldoReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : sueldo1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:SueldoReturnView = await response_json.json();
			
			sueldoReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.sueldo1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return sueldoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, sueldo: Sueldo) => {
	//mostrarLoader();	
	
	let sueldoReturnView1:SueldoReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:SueldoCreateRequest = {
		created_at : sueldo.created_at,
		updated_at : sueldo.updated_at,
		id_docente : sueldo.id_docente,
		anio : sueldo.anio,
		mes : sueldo.mes,
		valor : sueldo.valor,
		cobrado : sueldo.cobrado,
	};
	
	var data_json = { 
		sueldo: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:SueldoReturnView = await response_json.json();
			
			sueldoReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return sueldoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, sueldo: Sueldo) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let sueldoReturnView1:SueldoReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:SueldoUpdateRequest = {
		id : Number(sueldo.id),	
		created_at : sueldo.created_at,					
		updated_at : sueldo.updated_at,																
		id_docente : sueldo.id_docente,																
		anio : sueldo.anio,																
		mes : sueldo.mes,																
		valor : sueldo.valor,																
		cobrado : sueldo.cobrado,																
	};
	
	var data_json = { 
		sueldo: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:SueldoReturnView = await response_json.json();
			
			sueldoReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return sueldoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, sueldo: Sueldo) => {
	let sueldoReturnView1:SueldoReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = sueldo.id;*/
	
	var id_json = { 
		id: sueldo.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:SueldoReturnView = await response_json.json();
			
			sueldoReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return sueldoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

/*FKs*/
const getFksData = async (module:string, controller:string) => {

	let sueldoReturnView1:SueldoReturnView = null;	
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);										
	
	const data_json = {};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);						
		
		if(response_json?.ok) {
			const data_json:SueldoFKReturnView = await response_json.json();
			
			sueldoReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return sueldoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};



export {procesarTodosDatosData,
		onClickTableRowData,
		nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		,
		getFksData
		};
