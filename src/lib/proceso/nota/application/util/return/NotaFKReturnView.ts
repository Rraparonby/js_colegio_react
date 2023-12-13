/*FKs*/
import type {Alumno} from "@/lib/estructura/alumno/domain/entity/Alumno";
import type {Materia} from "@/lib/estructura/materia/domain/entity/Materia";
import type {Docente} from "@/lib/estructura/docente/domain/entity/Docente";
		

class NotaFKReturnView {
	
	alumnosFK : Array<Alumno>;
	materiasFK : Array<Materia>;
	docentesFK : Array<Docente>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
		this.materiasFK = new Array<Materia>();
		this.docentesFK = new Array<Docente>();
	}
}

export {NotaFKReturnView};
