import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioServiceService } from './services/usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesGuard implements CanLoad,CanActivate{

  constructor (private usuarioservices : UsuarioServiceService){}

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioservices.validarToken();
    
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioservices.validarToken();
  }


}
