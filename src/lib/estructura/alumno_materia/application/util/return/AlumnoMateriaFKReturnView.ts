/*FKs*/
import type {Alumno} from "@/lib/estructura/alumno/domain/entity/Alumno";
import type {Materia} from "@/lib/estructura/materia/domain/entity/Materia";
		

class AlumnoMateriaFKReturnView {
	
	alumnosFK : Array<Alumno>;
	materiasFK : Array<Materia>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
		this.materiasFK = new Array<Materia>();
	}
}

export {AlumnoMateriaFKReturnView};
