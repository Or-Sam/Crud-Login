import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, NgForm } from "@angular/forms";
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Usuario,Localidades, Municipios, Estados } from '../../modelo/modelo';
import { UsuarioServiceService } from '../../services/usuario-service.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent  implements OnInit {

@Input() idusuario! : number;
@Input() nombre!: string;
@Input() direccion! : string;
@Input() telefono! : string;
@Input() codpostal! : string;
@Input() tipousuario! : string;
@Input() estado! : string;
@Input() ciudad! : string;
@Input() localidad! : string;
@Input() roll! : string;
@Input() municipio! : string;

tokenUsuario:Usuario = {
  idusuario: 1,
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
  estadosArray : Estados [] = [];
  localidadArray : Localidades [] = [];
  municipioArray : Municipios [] = [];
  usuario! : Usuario;
  Vacio! : string;

  constructor(private usuarioService :UsuarioServiceService, 
              private modalCtrl: ModalController,
              public navParams: NavParams,
              public navCtrl : NavController,
              public formBuilder: FormBuilder) 
              { }
  
 ngOnInit() {
      this.ReflejarUsuario();
      console.log(this.tokenUsuario)
      this.Vacio = this.estado
      
      this.CargarTodo();
    
      
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm){

    console.log(this.tokenUsuario)
    this.usuarioService.putActualizarUsuario(this.tokenUsuario)
    .subscribe(
      res => console.log(res));
    this.dismiss();
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismiss' : true
    });
  }

  ReflejarUsuario(){
    this.usuarioService.getUnUsuarios(this.idusuario).subscribe((data: any) =>{
      this.nombre = data[0].nombre;
      this.direccion = data[0].direccion;
      this.telefono = data[0].telefono;
      this.codpostal = data[0].codpostal;
      this.tipousuario = data[0].tipousuario;
      this.roll = data[0].roll;
      this.estado = data[0].estado;
      this.municipio = data[0].municipio;
      this.localidad = data[0].localidad;
      this.actualizarTodo();
      this.obtenerLocalidades(this.estado,this.municipio)
      
    })

  }

  actualizarTodo(){
    this.tokenUsuario.idusuario=this.idusuario;
    this.tokenUsuario.nombre=this.nombre;
    this.tokenUsuario.direccion=this.direccion;
    this.tokenUsuario.telefono=this.telefono;
    this.tokenUsuario.codpostal=this.codpostal;
    this.tokenUsuario.tipousuario=this.tipousuario;
    this.tokenUsuario.estado=this.estado;
    this.tokenUsuario.localidad=this.localidad;
    this.tokenUsuario.roll=this.roll;
    this.tokenUsuario.municipio=this.municipio;
  }

  CargarTodo(){
    this.usuarioService.getAllEstados().subscribe((data: any) =>{
      this.estadosArray = data; 
    });
    this.usuarioService.getMunicipios(this.estado).subscribe((data: any ) =>{
      this.municipioArray = data; 
    });
    this.usuarioService.getLocalidades(this.municipio, this.estado).subscribe((data: any ) =>{
      this.localidadArray = data; 
    });

  }

  CambioEstado(algo: string){
    this.tokenUsuario.estado= algo;
    this.obtenerMunicipios(algo)
    this.Vacio = algo
    if(this.Vacio!= algo){
      this.localidadArray=[]
      
    }
  }

  CambioMunicipio(algo: string){
    this.tokenUsuario.municipio = algo;
    this.obtenerLocalidades(this.Vacio,algo)
  }

  CambioLocalidad(algo: string){
    this.tokenUsuario.localidad= algo;
  }

  obtenerMunicipios(IDEstado:string){ 
      this.usuarioService.getMunicipios(IDEstado).subscribe((data: any ) =>{
        
        this.municipioArray = data; 
      });
    }


  obtenerLocalidades(IDEstado:string, IDMunicipio: string){ 

    if ( IDEstado != '' || IDMunicipio!='' ){

      this.usuarioService.getLocalidades(IDEstado, IDMunicipio).subscribe((data: any ) =>{
        this.localidadArray = data; 
      });
    }
  }
    

    
}
