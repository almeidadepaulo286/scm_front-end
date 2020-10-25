import { Perfil } from './perfil';
import { Menu } from './menu';

export class Usuario {
    id: number;
    nome: string;
    login: string;
    email: string;
    senha?: string;
    situacao?: number;
    listaPerfil?: Perfil[];
    dataInclusao?: Date;
    dataAlteracao?: Date;
    //
    alterarSenhaLogin?: boolean;
    usuarioInclusaoId?: number;
    usuarioAlteracaoId?: number;
}