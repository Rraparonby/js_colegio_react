
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Pension} from '@/lib/financiero/pension/domain/entity/Pension';
import type {PensionReturnView} from '@/lib/financiero/pension/application/util/return/PensionReturnView';

import type {PensionCreateRequest} from '@/lib/financiero/pension/application/util/request/PensionCreateRequest';
import type {PensionUpdateRequest} from '@/lib/financiero/pension/application/util/request/PensionUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :PensionReturnView => {

	let pensionReturnView1:PensionReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:PensionReturnView = await response_json.json();
			
			pensionReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return pensionReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,pension1: Pension) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let pensionReturnView1:PensionReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : pension1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:PensionReturnView = await response_json.json();
			
			pensionReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.pension1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return pensionReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, pension: Pension) => {
	//mostrarLoader();	
	
	let pensionReturnView1:PensionReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:PensionCreateRequest = {
		created_at : pension.created_at,
		updated_at : pension.updated_at,
		id_alumno : pension.id_alumno,
		anio : pension.anio,
		mes : pension.mes,
		valor : pension.valor,
		cobrado : pension.cobrado,
	};
	
	var data_json = { 
		pension: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:PensionReturnView = await response_json.json();
			
			pensionReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return pensionReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, pension: Pension) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let pensionReturnView1:PensionReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:PensionUpdateRequest = {
		id : Number(pension.id),	
		created_at : pension.created_at,					
		updated_at : pension.updated_at,																
		id_alumno : pension.id_alumno,																
		anio : pension.anio,																
		mes : pension.mes,																
		valor : pension.valor,																
		cobrado : pension.cobrado,																
	};
	
	var data_json = { 
		pension: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:PensionReturnView = await response_json.json();
			
			pensionReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return pensionReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, pension: Pension) => {
	let pensionReturnView1:PensionReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = pension.id;*/
	
	var id_json = { 
		id: pension.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:PensionReturnView = await response_json.json();
			
			pensionReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return pensionReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

/*FKs*/
const getFksData = async (module:string, controller:string) => {

	let pensionReturnView1:PensionReturnView = null;	
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);										
	
	const data_json = {};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);						
		
		if(response_json?.ok) {
			const data_json:PensionFKReturnView = await response_json.json();
			
			pensionReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return pensionReturnView1;
		
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
