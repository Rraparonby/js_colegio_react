/*FKs*/
import type {Alumno} from "@/lib/estructura/alumno/domain/entity/Alumno";
		

class MatriculaFKReturnView {
	
	alumnosFK : Array<Alumno>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
	}
}

export {MatriculaFKReturnView};
