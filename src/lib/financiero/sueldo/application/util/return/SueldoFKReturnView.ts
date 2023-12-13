/*FKs*/
import type {Docente} from "@/lib/estructura/docente/domain/entity/Docente";
		

class SueldoFKReturnView {
	
	docentesFK : Array<Docente>;
	
	constructor() {
		
		this.docentesFK = new Array<Docente>();
	}
}

export {SueldoFKReturnView};
