import {Menu} from "../_models/menu";

export class Submenu {
  submenuId:number;
  nome: string;
  url: string;
  menu: Menu;

  constructor(){
      this.menu = new Menu();
  }
}