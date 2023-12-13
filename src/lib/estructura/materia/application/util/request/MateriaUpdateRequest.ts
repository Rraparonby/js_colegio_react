type MateriaUpdateRequest = {
	
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/

	/*CAMPOS*/
	codigo: string;
	nombre: string;
	activo: boolean;
}

export type {MateriaUpdateRequest};