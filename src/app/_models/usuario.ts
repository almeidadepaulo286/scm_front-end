import { Perfil } from "./perfil";
import { Menu } from "./menu";
import { Empresa } from "./empresa";

export class Usuario {
    usuarioId: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    cnpj: string;
    email: string;
    password?: string;
    perfis?: Perfil[];
    menus?: Menu[];
    empresas?: Empresa[];
    empresa?: any;
    token?: string;
    isEditable?:boolean;
    isVisible?:boolean;
}
