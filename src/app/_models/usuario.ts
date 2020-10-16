import { Perfil } from "./perfil";
import { Menu } from "./menu";

export class Usuario {
    id: number;
    nome: string;
    login: string;
    email: string;
    password?: string;
    perfis?: Perfil[];
    menus?: Menu[];
    token?: string;
    ativo:number;
    isEditable?:boolean;
    isVisible?:boolean;
}
