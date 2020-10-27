import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Usuario } from 'app/_models/usuario';
import { Perfil } from 'app/_models/perfil';
import { Idioma } from 'app/_models/idioma';

// Dados Mock da API: ja efetua parsing dos dados nas tabelas (json) para os respectivos registros (classe).
import * as dataUsuario from 'app/data/usuario.json';
import * as dataPerfil from 'app/data/perfil.json';
import * as dataIdioma from 'app/data/idioma.json';

@Injectable()
export class DataService {

    constructor(private storage: LocalStorageService) {}

    // Funcao executada na inicializacao da aplicacao:
    init() {
        // remove quaisquer dados anteriores no local-storage:
        this.storage.clear()

        // carrega as tabelas a partir dos arquivos /data/*.json, desconsiderando quaisquer alteracoes feitas:
        const tableIdioma: Usuario[] = (dataIdioma as any).default.table
        const tablePerfil: Perfil[] = (dataPerfil as any).default.table
        const tableUsuario: Idioma[] = (dataUsuario as any).default.table

        // salva as tabelas no local-storage:
        this.storage.store('tableUsuario', tableUsuario)
        this.storage.store('tablePerfil', tablePerfil)
        this.storage.store('tableIdioma', tableIdioma)
    }

    /*** USUARIO CORRENTEMENTE LOGADO */

    setCurrentUsuario(usuario: Usuario): void {
        this.storage.store('currentUsuario', usuario)
    }

    getCurrentUsuario(): Usuario {
        return this.storage.retrieve('currentUsuario')
    }

    setTokenUsuario(token: string): void {
        this.storage.store('tokenUsuario', token)
    }

    getTokenUsuario(): string {
        return this.storage.retrieve('tokenUsuario')
    }

    clearUsuario(): void {
        this.storage.clear('currentUsuario')
        this.storage.clear('tokenUsuario')
    }

    /*** TABELA DE USUARIOS */

    getTableUsuario(): Usuario[] {
        return this.storage.retrieve('tableUsuario')
    }

    setTableUsuario(tableUsuario: Usuario[]): void {
        this.storage.store('tableUsuario', tableUsuario)
    }

    addUsuario(usuario: Usuario): void {
        const tableUsuario: Usuario[] = this.storage.retrieve('tableUsuario')
        if (Array.isArray(tableUsuario)) {
            tableUsuario.push(usuario)
            this.setTableUsuario(tableUsuario)
        }
    }

    getUsuario(id: number): Usuario {
        const tableUsuario: Usuario[] = this.storage.retrieve('tableUsuario')
        return (Array.isArray(tableUsuario)) ? tableUsuario.find(item => item.id == id)
                                             : null
    }

    setUsuario(usuario: Usuario): void {
        const tableUsuario: Usuario[] = this.storage.retrieve('tableUsuario')
        if (Array.isArray(tableUsuario)) {
            const idx = tableUsuario.findIndex(item => item.id == usuario.id)
            if (idx > -1) {
                tableUsuario[idx] = usuario
                this.setTableUsuario(tableUsuario)
            }
        }
    }

    delUsuario(id: number): void {
        const tableUsuario: Usuario[] = this.storage.retrieve('tableUsuario')
        if (Array.isArray(tableUsuario)) {
            const idx = tableUsuario.findIndex(item => item.id == id)
            if (idx > -1) {
                tableUsuario.splice(idx, 1)
                this.setTableUsuario(tableUsuario)
            }
        }
    }

    /*** TABELA DE PERFIS */

    getTablePerfil(): Perfil[] {
        return this.storage.retrieve('tablePerfil')
    }

    setTablePerfil(tablePerfil: Perfil[]): void {
        this.storage.store('tablePerfil', tablePerfil)
    }

    addPerfil(perfil: Perfil): void {
        const tablePerfil: Perfil[] = this.storage.retrieve('tablePerfil')
        if (Array.isArray(tablePerfil)) {
            tablePerfil.push(perfil)
            this.setTablePerfil(tablePerfil)
        }
    }

    getPerfil(id: number): Perfil {
        const tablePerfil: Perfil[] = this.storage.retrieve('tablePerfil')
        return (Array.isArray(tablePerfil)) ? tablePerfil.find(item => item.id == id)
                                            : null
    }

    setPerfil(perfil: Perfil): void {
        const tablePerfil: Perfil[] = this.storage.retrieve('tablePerfil')
        if (Array.isArray(tablePerfil)) {
            const idx = tablePerfil.findIndex(item => item.id == perfil.id)
            if (idx > -1) {
                tablePerfil[idx] = perfil
                this.setTablePerfil(tablePerfil)
            }
        }
    }

    delPerfil(id: number): void {
        const tablePerfil: Perfil[] = this.storage.retrieve('tablePerfil')
        if (Array.isArray(tablePerfil)) {
            const idx = tablePerfil.findIndex(item => item.id == id)
            if (idx > -1) {
                tablePerfil.splice(idx, 1)
                this.setTablePerfil(tablePerfil)
            }
        }
    }

    /*** TABELA DE IDIOMAS */

    getTableIdioma(): Idioma[] {
        return this.storage.retrieve('tableIdioma')
    }

    setTableIdioma(tableIdioma: Idioma[]): void {
        this.storage.store('tableIdioma', tableIdioma)
    }

    addIdioma(idioma: Idioma): void {
        const tableIdioma: Idioma[] = this.storage.retrieve('tableIdioma')
        if (Array.isArray(tableIdioma)) {
            tableIdioma.push(idioma)
            this.setTableIdioma(tableIdioma)
        }
    }

    getIdioma(id: number): Idioma {
        const tableIdioma: Idioma[] = this.storage.retrieve('tableIdioma')
        return (Array.isArray(tableIdioma)) ? tableIdioma.find(item => item.id == id)
                                            : null
    }

    setIdioma(idioma: Idioma): void {
        const tableIdioma: Idioma[] = this.storage.retrieve('tableIdioma')
        if (Array.isArray(tableIdioma)) {
            const idx = tableIdioma.findIndex(item => item.id == idioma.id)
            if (idx > -1) {
                tableIdioma[idx] = idioma
                this.setTableIdioma(tableIdioma)
            }
        }
    }

    delIdioma(id: number): void {
        const tableIdioma: Idioma[] = this.storage.retrieve('tableIdioma')
        if (Array.isArray(tableIdioma)) {
            const idx = tableIdioma.findIndex(item => item.id == id)
            if (idx > -1) {
                tableIdioma.splice(idx, 1)
                this.setTableIdioma(tableIdioma)
            }
        }
    }
}