/*FKs*/


/*RELACIONES*/
import {Matricula} from '@/lib/proceso/matricula/domain/entity/Matricula';
import {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';
import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import {Pension} from '@/lib/financiero/pension/domain/entity/Pension';
import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';


class Alumno {
	
	static ALUMNO = 'alumno';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	nombre: string;	
	apellido: string;	
	fecha_nacimiento: string;	
	
	/*---------------- FKs ----------------*/
	
	
	/*---------------- RELACIONES ----------------*/
	
	matricula: Matricula | undefined;
	alumno_materias: Array<AlumnoMateria> | undefined;
	materias: Array<Materia> | undefined;
	pensions: Array<Pension> | undefined;
	notas: Array<Nota> | undefined;
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.nombre='';
		this.apellido='';
		this.fecha_nacimiento='2001-01-01 01:01:01';
		
		/*-------------- FKs --------------*/
		
		
		/*-------------- RELACIONES --------------*/
		
		this.matricula = undefined;
		this.alumno_materias = undefined;
		this.materias = undefined;
		this.pensions = undefined;
		this.notas = undefined;
	}
}

export {Alumno};