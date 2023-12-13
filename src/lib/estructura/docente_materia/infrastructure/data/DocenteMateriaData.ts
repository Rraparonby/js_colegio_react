
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';
import type {DocenteMateriaReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaReturnView';

import type {DocenteMateriaCreateRequest} from '@/lib/estructura/docente_materia/application/util/request/DocenteMateriaCreateRequest';
import type {DocenteMateriaUpdateRequest} from '@/lib/estructura/docente_materia/application/util/request/DocenteMateriaUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :DocenteMateriaReturnView => {

	let docente_materiaReturnView1:DocenteMateriaReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteMateriaReturnView = await response_json.json();
			
			docente_materiaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return docente_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,docente_materia1: DocenteMateria) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let docente_materiaReturnView1:DocenteMateriaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : docente_materia1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteMateriaReturnView = await response_json.json();
			
			docente_materiaReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.docente_materia1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return docente_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, docente_materia: DocenteMateria) => {
	//mostrarLoader();	
	
	let docente_materiaReturnView1:DocenteMateriaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:DocenteMateriaCreateRequest = {
		created_at : docente_materia.created_at,
		updated_at : docente_materia.updated_at,
		id_docente : docente_materia.id_docente,
		id_materia : docente_materia.id_materia,
	};
	
	var data_json = { 
		docente_materia: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteMateriaReturnView = await response_json.json();
			
			docente_materiaReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return docente_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, docente_materia: DocenteMateria) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let docente_materiaReturnView1:DocenteMateriaReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:DocenteMateriaUpdateRequest = {
		id : Number(docente_materia.id),	
		created_at : docente_materia.created_at,					
		updated_at : docente_materia.updated_at,																
		id_docente : docente_materia.id_docente,																
		id_materia : docente_materia.id_materia,																
	};
	
	var data_json = { 
		docente_materia: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:DocenteMateriaReturnView = await response_json.json();
			
			docente_materiaReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return docente_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, docente_materia: DocenteMateria) => {
	let docente_materiaReturnView1:DocenteMateriaReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = docente_materia.id;*/
	
	var id_json = { 
		id: docente_materia.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:DocenteMateriaReturnView = await response_json.json();
			
			docente_materiaReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return docente_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

/*FKs*/
const getFksData = async (module:string, controller:string) => {

	let docente_materiaReturnView1:DocenteMateriaReturnView = null;	
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);										
	
	const data_json = {};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);						
		
		if(response_json?.ok) {
			const data_json:DocenteMateriaFKReturnView = await response_json.json();
			
			docente_materiaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return docente_materiaReturnView1;
		
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
