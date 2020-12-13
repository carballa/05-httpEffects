
import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioSucess, cargarUsuarioError } from '../actions';
import { Usuario } from '../../modelos/usuario.model';
import { UsuariosState } from './usuarios.reducer';

export interface UsuarioState {
    id     : string;
    user   : Usuario;
    loaded : boolean;
    loading: boolean;
    error  : any;
}

export const usuarioInitialState: UsuarioState = {
    id     : null,
    user   : null,
    loaded : false,
    loading: false,
    error  : null,
};

const _usuarioReducer = createReducer(usuarioInitialState,
    on(cargarUsuario, (state, { idUsuario }) => ({
        ...state,
        loading: true,
        error  : null,
        id: idUsuario,
        })),
    on(cargarUsuarioSucess, ( state , { usuario }) => ({
         ...state,
          loading: false,
          loaded : true,
          error  : null,
          user   : {...usuario},
       })),
       on(cargarUsuarioError, ( state , { payload }) => ({
        ...state,
         loading: false,
         loaded : false,
         user   : null,
         error  : {
             url: payload.url,
             name: payload.name,
             message: payload.message,
         },
      })),
);

export function usuarioReducer( state , action ) {
    return _usuarioReducer(state, action);
}
