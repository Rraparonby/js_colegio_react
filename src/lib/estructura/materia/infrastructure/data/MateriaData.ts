
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import type {MateriaReturnView} from '@/lib/estructura/materia/application/util/return/MateriaReturnView';

import type {MateriaCreateRequest} from '@/lib/estructura/materia/application/util/request/MateriaCreateRequest';
import type {MateriaUpdateRequest} from '@/lib/estructura/materia/application/util/request/MateriaUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :MateriaReturnView => {

	let materiaReturnView1:MateriaReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:MateriaReturnView = await response_json.json();
			
			materiaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,materia1: Materia) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let materiaReturnView1:MateriaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : materia1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:MateriaReturnView = await response_json.json();
			
			materiaReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.materia1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, materia: Materia) => {
	//mostrarLoader();	
	
	let materiaReturnView1:MateriaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:MateriaCreateRequest = {
		created_at : materia.created_at,
		updated_at : materia.updated_at,
		codigo : materia.codigo,
		nombre : materia.nombre,
		activo : materia.activo,
	};
	
	var data_json = { 
		materia: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:MateriaReturnView = await response_json.json();
			
			materiaReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, materia: Materia) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let materiaReturnView1:MateriaReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:MateriaUpdateRequest = {
		id : Number(materia.id),	
		created_at : materia.created_at,					
		updated_at : materia.updated_at,																
		codigo : materia.codigo,																
		nombre : materia.nombre,																
		activo : materia.activo,																
	};
	
	var data_json = { 
		materia: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:MateriaReturnView = await response_json.json();
			
			materiaReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, materia: Materia) => {
	let materiaReturnView1:MateriaReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = materia.id;*/
	
	var id_json = { 
		id: materia.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:MateriaReturnView = await response_json.json();
			
			materiaReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return materiaReturnView1;
		
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
