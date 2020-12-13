
import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../modelos/usuario.model';

export const cargarUsuario = createAction(
    '[Usuario] Cargar usuario',
    props<{ idUsuario: string }>()
    );

export const cargarUsuarioSucess = createAction(
    '[Usuario] Cargar usuario Sucess',
    props<{ usuario: Usuario }> () );

export const cargarUsuarioError = createAction(
    '[Usuario] Cargar usuario Error',
    props<{ payload: any }> () );
