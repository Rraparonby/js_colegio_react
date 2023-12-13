
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Nota} from '@/lib/proceso/nota/domain/entity/Nota';
import type {NotaReturnView} from '@/lib/proceso/nota/application/util/return/NotaReturnView';

import type {NotaCreateRequest} from '@/lib/proceso/nota/application/util/request/NotaCreateRequest';
import type {NotaUpdateRequest} from '@/lib/proceso/nota/application/util/request/NotaUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :NotaReturnView => {

	let notaReturnView1:NotaReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:NotaReturnView = await response_json.json();
			
			notaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return notaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,nota1: Nota) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let notaReturnView1:NotaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : nota1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:NotaReturnView = await response_json.json();
			
			notaReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.nota1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return notaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, nota: Nota) => {
	//mostrarLoader();	
	
	let notaReturnView1:NotaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:NotaCreateRequest = {
		created_at : nota.created_at,
		updated_at : nota.updated_at,
		id_alumno : nota.id_alumno,
		id_materia : nota.id_materia,
		id_docente : nota.id_docente,
		nota_prueba : nota.nota_prueba,
		nota_trabajo : nota.nota_trabajo,
		nota_examen : nota.nota_examen,
		nota_final : nota.nota_final,
	};
	
	var data_json = { 
		nota: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:NotaReturnView = await response_json.json();
			
			notaReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return notaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, nota: Nota) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let notaReturnView1:NotaReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:NotaUpdateRequest = {
		id : Number(nota.id),	
		created_at : nota.created_at,					
		updated_at : nota.updated_at,																
		id_alumno : nota.id_alumno,																
		id_materia : nota.id_materia,																
		id_docente : nota.id_docente,																
		nota_prueba : nota.nota_prueba,																
		nota_trabajo : nota.nota_trabajo,																
		nota_examen : nota.nota_examen,																
		nota_final : nota.nota_final,																
	};
	
	var data_json = { 
		nota: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:NotaReturnView = await response_json.json();
			
			notaReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return notaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, nota: Nota) => {
	let notaReturnView1:NotaReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = nota.id;*/
	
	var id_json = { 
		id: nota.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:NotaReturnView = await response_json.json();
			
			notaReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return notaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

/*FKs*/
const getFksData = async (module:string, controller:string) => {

	let notaReturnView1:NotaReturnView = null;	
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);										
	
	const data_json = {};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);						
		
		if(response_json?.ok) {
			const data_json:NotaFKReturnView = await response_json.json();
			
			notaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return notaReturnView1;
		
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
