export interface RespuestaMDB{
    results: Usuario[];
    Locs: Localidades[];
    Muni: Municipios[];
    Estado: Estados[];
}

export interface Cuenta{
    Cuenta : string;
    PCuenta : string;
}

export interface Usuario {
    idusuario: number;
    nombre: string;
    direccion: string;
    telefono: string;
    codpostal: string;
    tipousuario: string;
    estado: string;
    localidad: string;
    roll: string;
    municipio: string;
}

export interface VistaCompleta {
    idusuario: number;
    nombre: string;
    direccion: string;
    telefono: string;
    codpostal: string;
    tipousuario: string;
    roll: string;
    entidad_federativa: string;
    municipio: string;
    noM_LOC: string;

}

export interface Usuariosin {
    nombre: string;
    direccion: string;
    telefono: string;
    codpostal: string;
    tipousuario: string;
    estado: string;
    localidad: string;
    roll: string;
    municipio: string;
}


export interface Localidades {
    cvE_ENT: string;
    cvE_MUN: string;
    cvE_LOC: string;
    noM_LOC: string;

}

export interface Municipios {
    cataloG_KEY: string;
    municipio: string;
    efE_KEY: string;
    estatus: string;
}

export interface Estados {
    cataloG_KEY: string;
    entidaD_FEDERATIVA: string;
    abreviatura: string;

}
