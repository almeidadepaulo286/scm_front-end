import {Usuario} from './usuario';

export class Empresa {
    empresaId:number;
    nome:string;
    usuarios?:Usuario[];
    isEditable?:boolean;
    isVisible?:boolean;
}