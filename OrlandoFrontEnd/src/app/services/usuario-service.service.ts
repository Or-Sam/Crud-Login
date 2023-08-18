import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaMDB, Usuario, Usuariosin, Estados, Municipios, Localidades, VistaCompleta, Cuenta } from '../modelo/modelo';
import { Storage } from '@ionic/storage';
import { NavController} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  [x: string]: any;

  tokenStore: string = '';

  
  private url = "Usuarios";


  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl : NavController) {
  }
  // ngOnInit(){
  //   const storage = this.storage.create();
  // }
  getUsuarios()  {

    return this.http.get<Usuario[]>(`${environment.apiUrl}/${this.url}`);
    }

  getUnUsuarios(IdUsuario: any)  {

    return this.http.get<Usuario[]>(`${environment.apiUrl}/${this.url}/buscar/${IdUsuario}`);
    }

  getEliminarUsuario(IdUsuario: any)  {

    return this.http.get<Usuario[]>(`${environment.apiUrl}/${this.url}/eliminar/${IdUsuario}`);
    }

  postCrearUsuario(usuarios:Usuariosin)  {

    return this.http.post<Usuario>(`${environment.apiUrl}/${this.url}/crear` , usuarios);
    }
  
  putActualizarUsuario(usuarios:Usuario)  {

    return this.http.put<Usuario[]>(`${environment.apiUrl}/${this.url}/actualizar`, usuarios);
    }

  PutLogeoUsuario(Cuenta : Cuenta)  {

  return this.http.put(`${environment.apiUrl}/Logeo`,Cuenta);
  }

   PostObtenerToken(Cuenta : Cuenta)  {
    return this.http.post(`${environment.apiUrl}/Logeo/login`,Cuenta);
  }

  CreateCuenta(Cuenta : Cuenta)  {
  return this.http.post<Cuenta[]>(`${environment.apiUrl}/Logeo/registrar`, Cuenta);
  }
  
  getAllEstados()  {

    return this.http.get<Estados[]>(`${environment.apiUrl}/Estados`);
    }
  
  getEstado(CATALOG_KEY : any)  {

    return this.http.get<Estados[]>(`${environment.apiUrl}/Estadonombre/${CATALOG_KEY}`);
    }

  getMunicipios (EFE_KEY: any)  {

    return this.http.get<Municipios[]>(`${environment.apiUrl}/Municipios/${EFE_KEY}`);
    }
  

  getLocalidades (CVE_ENT: any,cataloG_KEY: any)  {

    return this.http.get<Localidades[]>(`${environment.apiUrl}/Localidades/${CVE_ENT}/${cataloG_KEY}`);
    }

  getVistaCompleta () {
    return this.http.get<VistaCompleta[]>(`${environment.apiUrl}/Vistacompleta`);
  }

  async getToken(){
    this.tokenStore = await this.storage.get('tokenEncriptado')||null
  }


  async validarToken(): Promise<boolean>{
    
    await this.getToken();
    if(!this.tokenStore){
      this.navCtrl.navigateRoot('login');
      return false

    }
    return true
  }

  async validarLogeo(): Promise<boolean>{
    
    await this.getToken();
    if(this.tokenStore){
      this.navCtrl.navigateRoot('main/tabs/tab1');
      return false
      

    }
    return true
  }

}
