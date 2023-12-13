/*FKs*/
import type {Docente} from "@/lib/estructura/docente/domain/entity/Docente";
		

class ContratoFKReturnView {
	
	docentesFK : Array<Docente>;
	
	constructor() {
		
		this.docentesFK = new Array<Docente>();
	}
}

export {ContratoFKReturnView};
