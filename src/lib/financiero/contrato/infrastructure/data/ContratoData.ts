
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';
import type {ContratoReturnView} from '@/lib/financiero/contrato/application/util/return/ContratoReturnView';

import type {ContratoCreateRequest} from '@/lib/financiero/contrato/application/util/request/ContratoCreateRequest';
import type {ContratoUpdateRequest} from '@/lib/financiero/contrato/application/util/request/ContratoUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :ContratoReturnView => {

	let contratoReturnView1:ContratoReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:ContratoReturnView = await response_json.json();
			
			contratoReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return contratoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,contrato1: Contrato) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let contratoReturnView1:ContratoReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : contrato1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:ContratoReturnView = await response_json.json();
			
			contratoReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.contrato1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return contratoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, contrato: Contrato) => {
	//mostrarLoader();	
	
	let contratoReturnView1:ContratoReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:ContratoCreateRequest = {
		created_at : contrato.created_at,
		updated_at : contrato.updated_at,
		anio : contrato.anio,
		valor : contrato.valor,
		fecha : contrato.fecha,
		firmado : contrato.firmado,
	};
	
	var data_json = { 
		contrato: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:ContratoReturnView = await response_json.json();
			
			contratoReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return contratoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, contrato: Contrato) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let contratoReturnView1:ContratoReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:ContratoUpdateRequest = {
		id : Number(contrato.id),	
		created_at : contrato.created_at,					
		updated_at : contrato.updated_at,																
		anio : contrato.anio,																
		valor : contrato.valor,																
		fecha : contrato.fecha,					
		firmado : contrato.firmado,																
	};
	
	var data_json = { 
		contrato: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:ContratoReturnView = await response_json.json();
			
			contratoReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return contratoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, contrato: Contrato) => {
	let contratoReturnView1:ContratoReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = contrato.id;*/
	
	var id_json = { 
		id: contrato.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:ContratoReturnView = await response_json.json();
			
			contratoReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return contratoReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

/*FKs*/
const getFksData = async (module:string, controller:string) => {

	let contratoReturnView1:ContratoReturnView = null;	
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);										
	
	const data_json = {};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);						
		
		if(response_json?.ok) {
			const data_json:ContratoFKReturnView = await response_json.json();
			
			contratoReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return contratoReturnView1;
		
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
