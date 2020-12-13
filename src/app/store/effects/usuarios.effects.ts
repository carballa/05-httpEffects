import { Injectable } from '@angular/core';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Injectable()
export class UsuariosEffects{
 constructor(
     private actions$: Actions,
     private usuariosService: UsuarioService,
 )
 {}
// ofType es un operador, escucha una acción.
// tap es un operador de rxjs que puede disparar efectos secundarios.
// mergeMap dispara un nuevo observable y mezclarlo con el observable anterior. 
// codigo comentado sería para poder sacar logs de como funciona.
// despois ven código limpio.
/* cargarUsuarios$ = createEffect(
     () => this.actions$.pipe(
        ofType( usuariosActions.cargarUsuarios ),
        tap( data => console.log( 'effect tap ', data )),
        mergeMap( // lleva el observable que quiere disparar.
            () => this.usuariosService.getUsuarios()
                  .pipe(
                      tap( data => console.log(' get usuarios del efecto', data ) )
                      )
        )
     )
 );
 */
cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
       ofType( usuariosActions.cargarUsuarios ),
       mergeMap( // lleva el observable que quiere disparar.
           () => this.usuariosService.getUsuarios()
                 .pipe(
                     map       ( users  =>     usuariosActions.cargarUsuariosSucess({ usuarios: users } ) ),
                     catchError( err    => of( usuariosActions.cargarUsuariosError({ payload  : err   } ) )  )
                     )
       )
    )
);

}
