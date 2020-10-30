import { Idioma } from './idioma';
import { Perfil } from './perfil';
import { Menu } from './menu';

export class Usuario {
    id: number;
    nome: string;
    login: string;
    email: string;
    senha?: string;
    situacao?: number;
    idioma?: Idioma;
    listaPerfil?: Perfil[];
    //
    alterarSenhaLogin?: boolean;
    dataInclusao?: Date;
    idUsuarioInclusao?: number;
    dataAlteracao?: Date;
    idUsuarioAlteracao?: number;
}