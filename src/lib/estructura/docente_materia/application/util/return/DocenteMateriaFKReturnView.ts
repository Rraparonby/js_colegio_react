/*FKs*/
import type {Docente} from "@/lib/estructura/docente/domain/entity/Docente";
import type {Materia} from "@/lib/estructura/materia/domain/entity/Materia";
		

class DocenteMateriaFKReturnView {
	
	docentesFK : Array<Docente>;
	materiasFK : Array<Materia>;
	
	constructor() {
		
		this.docentesFK = new Array<Docente>();
		this.materiasFK = new Array<Materia>();
	}
}

export {DocenteMateriaFKReturnView};
