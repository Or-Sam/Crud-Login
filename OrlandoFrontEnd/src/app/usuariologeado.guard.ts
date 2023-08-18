import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioServiceService } from './services/usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariologeadoGuard implements CanActivate, CanLoad {
cosas: any;
cosas2: any;
  constructor (private usuarioservices : UsuarioServiceService){}
  
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioservices.validarLogeo();
    
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioservices.validarLogeo();
  }
}
