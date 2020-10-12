import { Submenu, Perfil } from 'app/_models';

export class Menu {

  menuId: number;
  nome?: string;
  posicao?: number;
  submenus?: Submenu[] = [];
  perfis?: Perfil[] = [];

}
