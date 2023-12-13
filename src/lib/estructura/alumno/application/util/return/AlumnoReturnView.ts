import {Alumno} from "@/lib/estructura/alumno/domain/entity/Alumno";

class AlumnoReturnView {	
	title : string; 
	alumnos : Array<Alumno>;
	alumno1 : Alumno;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.alumnos = new Array<Alumno>();
		this.alumno1 = new Alumno();
		this.action = '';
		this.action_title = '';
	}
}

export {AlumnoReturnView};
