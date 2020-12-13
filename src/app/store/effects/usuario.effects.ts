import { Injectable } from '@angular/core';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { cargarUsuarioSucess, cargarUsuario } from '../actions/usuario.actions';

@Injectable()
export class UsuarioEffects{
 constructor(
     private actions$: Actions,
     private usuarioService: UsuarioService,
 )
 {}
// ofType es un operador, escucha una acción.
// tap es un operador de rxjs que puede disparar efectos secundarios.
// mergeMap dispara un nuevo observable y mezclarlo con el observable anterior. 
// codigo comentado sería para poder sacar logs de como funciona.
// despois ven código limpio.
/* cargarUsuario$ = createEffect(
     () => this.actions$.pipe(
        ofType( usuarioActions.cargarUsuario ),
        tap( data => console.log( 'effect tap ', data )),
        mergeMap( // lleva el observable que quiere disparar.
            () => this.usuarioService.getUsuario()
                  .pipe(
                      tap( data => console.log(' get usuario del efecto', data ) )
                      )
        )
     )
 );
 */
cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
       ofType( usuarioActions.cargarUsuario ),
       mergeMap( // lleva el observable que quiere disparar.
           ( action ) => this.usuarioService.getUsuarioById( action.idUsuario )
                 .pipe(
                     map       ( user  =>     usuarioActions.cargarUsuarioSucess({ usuario: user } ) ),
                     catchError( err    => of( usuarioActions.cargarUsuarioError({ payload  : err   } ) )  )
                     )
       )
    )
);

}
