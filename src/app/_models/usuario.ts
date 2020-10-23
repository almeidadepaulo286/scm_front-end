import { Perfil } from "./perfil";
import { Menu } from "./menu";

export class Usuario {
    id: number;
    nome: string;
    login: string;
    email: string;
    senha?: string;
    ativo:number;
    perfis?: Perfil[];
    menus?: Menu[];
    token?: string;
    isEditable?:boolean;
    isVisible?:boolean;
    data_atualizacao: string;
    data_criacao: string;
}
