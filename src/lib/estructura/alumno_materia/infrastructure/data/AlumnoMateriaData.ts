
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';
import type {AlumnoMateriaReturnView} from '@/lib/estructura/alumno_materia/application/util/return/AlumnoMateriaReturnView';

import type {AlumnoMateriaCreateRequest} from '@/lib/estructura/alumno_materia/application/util/request/AlumnoMateriaCreateRequest';
import type {AlumnoMateriaUpdateRequest} from '@/lib/estructura/alumno_materia/application/util/request/AlumnoMateriaUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :AlumnoMateriaReturnView => {

	let alumno_materiaReturnView1:AlumnoMateriaReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoMateriaReturnView = await response_json.json();
			
			alumno_materiaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return alumno_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,alumno_materia1: AlumnoMateria) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let alumno_materiaReturnView1:AlumnoMateriaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : alumno_materia1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoMateriaReturnView = await response_json.json();
			
			alumno_materiaReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.alumno_materia1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return alumno_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, alumno_materia: AlumnoMateria) => {
	//mostrarLoader();	
	
	let alumno_materiaReturnView1:AlumnoMateriaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:AlumnoMateriaCreateRequest = {
		created_at : alumno_materia.created_at,
		updated_at : alumno_materia.updated_at,
		id_alumno : alumno_materia.id_alumno,
		id_materia : alumno_materia.id_materia,
	};
	
	var data_json = { 
		alumno_materia: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoMateriaReturnView = await response_json.json();
			
			alumno_materiaReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return alumno_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, alumno_materia: AlumnoMateria) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let alumno_materiaReturnView1:AlumnoMateriaReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:AlumnoMateriaUpdateRequest = {
		id : Number(alumno_materia.id),	
		created_at : alumno_materia.created_at,					
		updated_at : alumno_materia.updated_at,																
		id_alumno : alumno_materia.id_alumno,																
		id_materia : alumno_materia.id_materia,																
	};
	
	var data_json = { 
		alumno_materia: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:AlumnoMateriaReturnView = await response_json.json();
			
			alumno_materiaReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return alumno_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, alumno_materia: AlumnoMateria) => {
	let alumno_materiaReturnView1:AlumnoMateriaReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = alumno_materia.id;*/
	
	var id_json = { 
		id: alumno_materia.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:AlumnoMateriaReturnView = await response_json.json();
			
			alumno_materiaReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return alumno_materiaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

/*FKs*/
const getFksData = async (module:string, controller:string) => {

	let alumno_materiaReturnView1:AlumnoMateriaReturnView = null;	
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);										
	
	const data_json = {};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);						
		
		if(response_json?.ok) {
			const data_json:AlumnoMateriaFKReturnView = await response_json.json();
			
			alumno_materiaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return alumno_materiaReturnView1;
		
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
