
import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Matricula} from '@/lib/proceso/matricula/domain/entity/Matricula';
import type {MatriculaReturnView} from '@/lib/proceso/matricula/application/util/return/MatriculaReturnView';

import type {MatriculaCreateRequest} from '@/lib/proceso/matricula/application/util/request/MatriculaCreateRequest';
import type {MatriculaUpdateRequest} from '@/lib/proceso/matricula/application/util/request/MatriculaUpdateRequest';



const procesarTodosDatosData = async (module:string, controller:string, pagination1:Pagination) :MatriculaReturnView => {

	let matriculaReturnView1:MatriculaReturnView = null;
	
	const url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
	
	const data_json = { 
		pagination : pagination1
	}
	
	try {
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		if(response_json?.ok) {
			const data_json:MatriculaReturnView = await response_json.json();
			
			matriculaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return matriculaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
			
};

const onClickTableRowData = async (module:string, controller:string,matricula1: Matricula) => {		
	//tipo_accion.value = Constantes.SELECCIONAR;			
	
	let matriculaReturnView1:MatriculaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller,Constantes.RJ_SELECCIONAR);

	var id_json = { 
		id : matricula1.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:MatriculaReturnView = await response_json.json();
			
			matriculaReturnView1 = data_json;
		
			/*emit('handleAction_ClickTableRowTableView',data_json.matricula1);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return matriculaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const nuevoDatosData = async (module:string, controller:string, matricula: Matricula) => {
	//mostrarLoader();	
	
	let matriculaReturnView1:MatriculaReturnView = null;
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.NUEVO);
				
	var form_json:MatriculaCreateRequest = {
		created_at : matricula.created_at,
		updated_at : matricula.updated_at,
		anio : matricula.anio,
		costo : matricula.costo,
		fecha : matricula.fecha,
		pagado : matricula.pagado,
	};
	
	var data_json = { 
		matricula: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:MatriculaReturnView = await response_json.json();
			
			matriculaReturnView1 = data_json;
		
			/*emit('handleAction_NuevoDatosView',data);*/
		} else {
			console.log(await response_json.json());
		}
		
		return matriculaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const actualizarDatosData = async (module:string, controller:string, matricula: Matricula) => {
	/*mostrarLoader();*/
	/*tipo_accion.value = Constantes.SELECCIONAR;*/
	
	let matriculaReturnView1:MatriculaReturnView = null;
			
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ACTUALIZAR);
		
	var form_json:MatriculaUpdateRequest = {
		id : Number(matricula.id),	
		created_at : matricula.created_at,					
		updated_at : matricula.updated_at,																
		anio : matricula.anio,																
		costo : matricula.costo,																
		fecha : matricula.fecha,					
		pagado : matricula.pagado,																
	};
	
	var data_json = { 
		matricula: form_json
	};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
		
		const response_json = await fetch(url_global_controller,request_options);
		
		if(response_json?.ok) {
			const data_json:MatriculaReturnView = await response_json.json();
			
			matriculaReturnView1 = data_json;
		
			/*emit('handleAction_ActualizarDatosView',data);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return matriculaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

const eliminarDatosData = async (module:string, controller:string, matricula: Matricula) => {
	let matriculaReturnView1:MatriculaReturnView = null;	
	
	/*mostrarLoader();	*/
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.ELIMINAR);
	/*let id = matricula.id;*/
	
	var id_json = { 
		id: matricula.id 
	};			
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);			
		
		if(response_json?.ok) {
			const data_json:MatriculaReturnView = await response_json.json();
			
			matriculaReturnView1 = data_json;
		
			/*emit('handleAction_EliminarDatosView',data_json);*/
			
		} else {
			console.log(await response_json.json());
		}
		
		return matriculaReturnView1;
		
	} catch(error) {
		console.log(error);
	}
};

/*FKs*/
const getFksData = async (module:string, controller:string) => {

	let matriculaReturnView1:MatriculaReturnView = null;	
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);										
	
	const data_json = {};
	
	try {
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);						
		
		if(response_json?.ok) {
			const data_json:MatriculaFKReturnView = await response_json.json();
			
			matriculaReturnView1 = data_json;
		
		} else {
			console.log(await response_json.json());
		}
		
		return matriculaReturnView1;
		
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
