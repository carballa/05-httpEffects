import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario : Usuario;
  cargando: boolean = false;
  error   : any     = null;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('usuario').subscribe( ({ user , loading, error }) => {
      console.log(' sotre cargando ',loading,user);
      this.usuario  = user;
       this.cargando = loading;
       this.error    = error;
    });

    this.router.params.subscribe(
      ({ id }) => {
        console.log( id );
        this.store.dispatch( cargarUsuario( {idUsuario: id } ) )
      }
    );
  }

}
