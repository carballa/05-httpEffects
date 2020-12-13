
import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../modelos/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] Cargar usuarios');

export const cargarUsuariosSucess = createAction(
    '[Usuarios] Cargar usuarios Sucess',
    props<{ usuarios: Usuario[] }> () );

export const cargarUsuariosError = createAction(
    '[Usuarios] Cargar usuarios Error',
    props<{ payload: any }> () );
