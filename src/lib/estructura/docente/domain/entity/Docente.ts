/*FKs*/


/*RELACIONES*/
import {Sueldo} from '@/lib/financiero/sueldo/domain/entity/Sueldo';
import {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';
import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';
import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';


class Docente {
	
	static DOCENTE = 'docente';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	nombre: string;	
	apellido: string;	
	fecha_nacimiento: string;	
	anios_experiencia: number;	
	nota_evaluacion: number;	
	
	/*---------------- FKs ----------------*/
	
	
	/*---------------- RELACIONES ----------------*/
	
	sueldos: Array<Sueldo> | undefined;
	contrato: Contrato | undefined;
	materias: Array<Materia> | undefined;
	notas: Array<Nota> | undefined;
	docente_materias: Array<DocenteMateria> | undefined;
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.nombre='';
		this.apellido='';
		this.fecha_nacimiento='2001-01-01 01:01:01';
		this.anios_experiencia=0;
		this.nota_evaluacion=0.0;
		
		/*-------------- FKs --------------*/
		
		
		/*-------------- RELACIONES --------------*/
		
		this.sueldos = undefined;
		this.contrato = undefined;
		this.materias = undefined;
		this.notas = undefined;
		this.docente_materias = undefined;
	}
}

export {Docente};