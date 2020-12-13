import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { Usuario } from '../../modelos/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading : boolean = false;
  error   : any;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.store.dispatch( cargarUsuarios() );
    this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
      console.log( 'loading ', loading );
      this.usuarios = users;
      this.loading  = loading;
      this.error    = error;
    } );
  }

}
