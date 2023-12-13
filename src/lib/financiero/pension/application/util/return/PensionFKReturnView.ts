/*FKs*/
import type {Alumno} from "@/lib/estructura/alumno/domain/entity/Alumno";
		

class PensionFKReturnView {
	
	alumnosFK : Array<Alumno>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
	}
}

export {PensionFKReturnView};
