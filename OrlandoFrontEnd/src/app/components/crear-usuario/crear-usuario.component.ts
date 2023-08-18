import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, NgForm } from '@angular/forms';
import { Estados, Localidades, Municipios, Usuario, Usuariosin} from '../../modelo/modelo';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent  implements OnInit {
  TodoslosUsuarios: Usuario[] = [];
  estadosArray : Estados [] = [];
  estadosNombre : Estados [] = [];
  municipioArray : Municipios [] = [];
  localidadArray : Localidades [] = [];
  usuario! : Usuario;
  Vacio! : string;

  tokenUsuario:Usuariosin = {
      nombre : '',
      direccion : '',
      telefono : '',
      codpostal :  '',
      tipousuario :'',
      estado : '',
      localidad : '',
      roll : '',
      municipio:''
    };

    Getusuarios(){
      this.usuarioService.getUsuarios().subscribe (
        (resp:Usuario[]) =>{
          console.log('Resp', resp);
          this.TodoslosUsuarios = resp;
        });
      }

  constructor(private usuarioService : UsuarioServiceService,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private formBuilder: FormBuilder) { 
              }

  ngOnInit() {
    this. CargarTodo();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  Crear() {
    console.log(this.usuario)
  }


  onSubmit(form: NgForm){

    this.usuarioService.postCrearUsuario(this.tokenUsuario)
    .subscribe(
      res => console.log(res)); 
    this.dismiss();
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismiss' : true
    });
    this.Getusuarios
  }

  CargarTodo(){
    this.usuarioService.getAllEstados().subscribe((data: any) =>{
      this.estadosArray = data; 
    });
    this.usuarioService.getAllEstados().subscribe((data: any) =>{
      this.estadosArray = data; 
    });

  }

  CambioEstado(algoE: string){
    this.tokenUsuario.estado= algoE;
    this.obtenerMunicipios(algoE)
    this.Vacio = algoE
    if(this.Vacio!= algoE){
      this.localidadArray=[]
    }
  }

  CambioMunicipio(algoM: string){
    this.tokenUsuario.municipio = algoM;
    this.obtenerLocalidades(this.Vacio,algoM)
  }

  CambioLocalidad(algo: string){
    this.tokenUsuario.localidad= algo;
  }

  obtenerMunicipios(IDEstado:string){ 
      this.usuarioService.getMunicipios(IDEstado).subscribe((data: any ) =>{
        
        this.municipioArray = data; 

      });
    }


  obtenerLocalidades(IDEstado: any,IDMunicipio:string ){ 

    if ( IDEstado != '' || IDMunicipio!='' ){

      this.usuarioService.getLocalidades(IDEstado, IDMunicipio).subscribe((data: any ) =>{
        
        this.localidadArray = data; 
      });
    }
  }

}
