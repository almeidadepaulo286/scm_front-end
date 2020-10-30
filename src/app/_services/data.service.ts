import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Usuario } from 'app/_models/usuario';
import { Perfil } from 'app/_models/perfil';
import { Idioma } from 'app/_models/idioma';
import { Contrato } from 'app/_models/contrato';
import { Atividade } from 'app/_models/atividade';
import { Disciplina } from 'app/_models/disciplina';
import { FatorProdutividade } from 'app/_models/fator-produtividade';
import { Caracteristica } from 'app/_models/caracteristica';
import { UnidadeMedida } from 'app/_models/unidade-medida';

// Dados Mock da API: ja efetua parsing dos dados nas tabelas (json) para os respectivos registros (classe).
import * as dataUsuario from 'app/data/usuario.json';
import * as dataPerfil from 'app/data/perfil.json';
import * as dataIdioma from 'app/data/idioma.json';
import * as dataContrato from 'app/data/contrato.json';
import * as dataAtividade from 'app/data/atividade.json';
import * as dataDisciplina from 'app/data/disciplina.json';
import * as dataFatorProdutividade from 'app/data/fator-produtividade.json';
import * as dataCaracteristica from 'app/data/caracteristica.json';
import * as dataUnidadeMedida from 'app/data/unidade-medida.json';

@Injectable()
export class DataService {

    constructor(private storage: LocalStorageService) {}

    // Funcao executada na inicializacao da aplicacao:
    init() {
        // carrega as tabelas originais a partir dos arquivos /data/*.json:
        const tableUsuario: Usuario[] = (dataUsuario as any).default.table
        const tablePerfil: Perfil[] = (dataPerfil as any).default.table
        const tableIdioma: Idioma[] = (dataIdioma as any).default.table
        const tableContrato: Contrato[] = (dataContrato as any).default.table
        const tableAtividade: Atividade[] = (dataAtividade as any).default.table
        const tableDisciplina: Disciplina[] = (dataDisciplina as any).default.table
        const tableFatorProdutividade: FatorProdutividade[] = (dataFatorProdutividade as any).default.table
        const tableCaracteristica: Caracteristica[] = (dataCaracteristica as any).default.table
        const tableUnidadeMedida: UnidadeMedida[] = (dataUnidadeMedida as any).default.table

        // salva qualquer das tabelas no local-storage se nao existir:
        if (! this.storage.retrieve('tableUsuario')) {
            this.storage.store('tableUsuario', tableUsuario)
        }
        if (! this.storage.retrieve('tablePerfil')) {
            this.storage.store('tablePerfil', tablePerfil)
        }
        if (! this.storage.retrieve('tableIdioma')) {
            this.storage.store('tableIdioma', tableIdioma)
        }
        if (! this.storage.retrieve('tableContrato')) {
            this.storage.store('tableContrato', tableContrato)
        }
        if (! this.storage.retrieve('tableAtividade')) {
            this.storage.store('tableAtividade', tableAtividade)
        }
        if (! this.storage.retrieve('tableDisciplina')) {
            this.storage.store('tableDisciplina', tableDisciplina)
        }
        if (! this.storage.retrieve('tableFatorProdutividade')) {
            this.storage.store('tableFatorProdutividade', tableFatorProdutividade)
        }
        if (! this.storage.retrieve('tableCaracteristica')) {
            this.storage.store('tableCaracteristica', tableCaracteristica)
        }
        if (! this.storage.retrieve('tableUnidadeMedida')) {
            this.storage.store('tableUnidadeMedida', tableUnidadeMedida)
        }
    }

    // Limpa a base de dados do local-storage e recarrega as tabelas dos arquivos data*.json:
    clear() {
        // remove quaisquer dados anteriores no local-storage:
        this.storage.clear()

        // carrega as tabelas a partir dos arquivos /data/*.json, desconsiderando quaisquer alteracoes feitas:
        const tableUsuario: Usuario[] = (dataUsuario as any).default.table
        const tablePerfil: Perfil[] = (dataPerfil as any).default.table
        const tableIdioma: Idioma[] = (dataIdioma as any).default.table
        const tableContrato: Contrato[] = (dataContrato as any).default.table
        const tableAtividade: Atividade[] = (dataAtividade as any).default.table
        const tableDisciplina: Disciplina[] = (dataDisciplina as any).default.table
        const tableFatorProdutividade: FatorProdutividade[] = (dataFatorProdutividade as any).default.table
        const tableCaracteristica: Caracteristica[] = (dataCaracteristica as any).default.table
        const tableUnidadeMedida: UnidadeMedida[] = (dataUnidadeMedida as any).default.table

        // salva as tabelas no local-storage:
        this.storage.store('tableUsuario', tableUsuario)
        this.storage.store('tablePerfil', tablePerfil)
        this.storage.store('tableIdioma', tableIdioma)
        this.storage.store('tableContrato', tableContrato)
        this.storage.store('tableAtividade', tableAtividade)
        this.storage.store('tableDisciplina', tableDisciplina)
        this.storage.store('tableFatorProdutividade', tableFatorProdutividade)
        this.storage.store('tableCaracteristica', tableCaracteristica)
        this.storage.store('tableUnidadeMedida', tableUnidadeMedida)
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

    /*** TABELA DE CONTRATOS */

    getTableContrato(): Contrato[] {
        return this.storage.retrieve('tableContrato')
    }

    setTableContrato(tableContrato: Contrato[]): void {
        this.storage.store('tableContrato', tableContrato)
    }

    addContrato(contrato: Contrato): void {
        const tableContrato: Contrato[] = this.storage.retrieve('tableContrato')
        if (Array.isArray(tableContrato)) {
            tableContrato.push(contrato)
            this.setTableContrato(tableContrato)
        }
    }

    getContrato(id: number): Contrato {
        const tableContrato: Contrato[] = this.storage.retrieve('tableContrato')
        return (Array.isArray(tableContrato)) ? tableContrato.find(item => item.id == id)
                                             : null
    }

    setContrato(contrato: Contrato): void {
        const tableContrato: Contrato[] = this.storage.retrieve('tableContrato')
        if (Array.isArray(tableContrato)) {
            const idx = tableContrato.findIndex(item => item.id == contrato.id)
            if (idx > -1) {
                tableContrato[idx] = contrato
                this.setTableContrato(tableContrato)
            }
        }
    }

    delContrato(id: number): void {
        const tableContrato: Contrato[] = this.storage.retrieve('tableContrato')
        if (Array.isArray(tableContrato)) {
            const idx = tableContrato.findIndex(item => item.id == id)
            if (idx > -1) {
                tableContrato.splice(idx, 1)
                this.setTableContrato(tableContrato)
            }
        }
    }

    /*** TABELA DE ATIVIDADES */

    getTableAtividade(): Atividade[] {
        return this.storage.retrieve('tableAtividade')
    }

    setTableAtividade(tableAtividade: Atividade[]): void {
        this.storage.store('tableAtividade', tableAtividade)
    }

    addAtividade(atividade: Atividade): void {
        const tableAtividade: Atividade[] = this.storage.retrieve('tableAtividade')
        if (Array.isArray(tableAtividade)) {
            tableAtividade.push(atividade)
            this.setTableAtividade(tableAtividade)
        }
    }

    getAtividade(id: number): Atividade {
        const tableAtividade: Atividade[] = this.storage.retrieve('tableAtividade')
        return (Array.isArray(tableAtividade)) ? tableAtividade.find(item => item.id == id)
                                             : null
    }

    setAtividade(atividade: Atividade): void {
        const tableAtividade: Atividade[] = this.storage.retrieve('tableAtividade')
        if (Array.isArray(tableAtividade)) {
            const idx = tableAtividade.findIndex(item => item.id == atividade.id)
            if (idx > -1) {
                tableAtividade[idx] = atividade
                this.setTableAtividade(tableAtividade)
            }
        }
    }

    delAtividade(id: number): void {
        const tableAtividade: Atividade[] = this.storage.retrieve('tableAtividade')
        if (Array.isArray(tableAtividade)) {
            const idx = tableAtividade.findIndex(item => item.id == id)
            if (idx > -1) {
                tableAtividade.splice(idx, 1)
                this.setTableAtividade(tableAtividade)
            }
        }
    }

    /*** TABELA DE DISCIPLINAS */

    getTableDisciplina(): Disciplina[] {
        return this.storage.retrieve('tableDisciplina')
    }

    setTableDisciplina(tableDisciplina: Disciplina[]): void {
        this.storage.store('tableDisciplina', tableDisciplina)
    }

    addDisciplina(disciplina: Disciplina): void {
        const tableDisciplina: Disciplina[] = this.storage.retrieve('tableDisciplina')
        if (Array.isArray(tableDisciplina)) {
            tableDisciplina.push(disciplina)
            this.setTableDisciplina(tableDisciplina)
        }
    }

    getDisciplina(id: number): Disciplina {
        const tableDisciplina: Disciplina[] = this.storage.retrieve('tableDisciplina')
        return (Array.isArray(tableDisciplina)) ? tableDisciplina.find(item => item.id == id)
                                            : null
    }

    setDisciplina(disciplina: Disciplina): void {
        const tableDisciplina: Disciplina[] = this.storage.retrieve('tableDisciplina')
        if (Array.isArray(tableDisciplina)) {
            const idx = tableDisciplina.findIndex(item => item.id == disciplina.id)
            if (idx > -1) {
                tableDisciplina[idx] = disciplina
                this.setTableDisciplina(tableDisciplina)
            }
        }
    }

    delDisciplina(id: number): void {
        const tableDisciplina: Disciplina[] = this.storage.retrieve('tableDisciplina')
        if (Array.isArray(tableDisciplina)) {
            const idx = tableDisciplina.findIndex(item => item.id == id)
            if (idx > -1) {
                tableDisciplina.splice(idx, 1)
                this.setTableDisciplina(tableDisciplina)
            }
        }
    }

    /*** TABELA DE FATOR-PRODUTIVIDADE */

    getTableFatorProdutividade(): FatorProdutividade[] {
        return this.storage.retrieve('tableFatorProdutividade')
    }

    setTableFatorProdutividade(tableFatorProdutividade: FatorProdutividade[]): void {
        this.storage.store('tableFatorProdutividade', tableFatorProdutividade)
    }

    addFatorProdutividade(fatorProdutividade: FatorProdutividade): void {
        const tableFatorProdutividade: FatorProdutividade[] = this.storage.retrieve('tableFatorProdutividade')
        if (Array.isArray(tableFatorProdutividade)) {
            tableFatorProdutividade.push(fatorProdutividade)
            this.setTableFatorProdutividade(tableFatorProdutividade)
        }
    }

    getFatorProdutividade(id: number): FatorProdutividade {
        const tableFatorProdutividade: FatorProdutividade[] = this.storage.retrieve('tableFatorProdutividade')
        return (Array.isArray(tableFatorProdutividade)) ? tableFatorProdutividade.find(item => item.id == id)
                                             : null
    }

    setFatorProdutividade(fatorProdutividade: FatorProdutividade): void {
        const tableFatorProdutividade: FatorProdutividade[] = this.storage.retrieve('tableFatorProdutividade')
        if (Array.isArray(tableFatorProdutividade)) {
            const idx = tableFatorProdutividade.findIndex(item => item.id == fatorProdutividade.id)
            if (idx > -1) {
                tableFatorProdutividade[idx] = fatorProdutividade
                this.setTableFatorProdutividade(tableFatorProdutividade)
            }
        }
    }

    delFatorProdutividade(id: number): void {
        const tableFatorProdutividade: FatorProdutividade[] = this.storage.retrieve('tableFatorProdutividade')
        if (Array.isArray(tableFatorProdutividade)) {
            const idx = tableFatorProdutividade.findIndex(item => item.id == id)
            if (idx > -1) {
                tableFatorProdutividade.splice(idx, 1)
                this.setTableFatorProdutividade(tableFatorProdutividade)
            }
        }
    }

    /*** TABELA DE CARACTERISTICAS */

    getTableCaracteristica(): Caracteristica[] {
        return this.storage.retrieve('tableCaracteristica')
    }

    setTableCaracteristica(tableCaracteristica: Caracteristica[]): void {
        this.storage.store('tableCaracteristica', tableCaracteristica)
    }

    addCaracteristica(caracteristica: Caracteristica): void {
        const tableCaracteristica: Caracteristica[] = this.storage.retrieve('tableCaracteristica')
        if (Array.isArray(tableCaracteristica)) {
            tableCaracteristica.push(caracteristica)
            this.setTableCaracteristica(tableCaracteristica)
        }
    }

    getCaracteristica(id: number): Caracteristica {
        const tableCaracteristica: Caracteristica[] = this.storage.retrieve('tableCaracteristica')
        return (Array.isArray(tableCaracteristica)) ? tableCaracteristica.find(item => item.id == id)
                                            : null
    }

    setCaracteristica(caracteristica: Caracteristica): void {
        const tableCaracteristica: Caracteristica[] = this.storage.retrieve('tableCaracteristica')
        if (Array.isArray(tableCaracteristica)) {
            const idx = tableCaracteristica.findIndex(item => item.id == caracteristica.id)
            if (idx > -1) {
                tableCaracteristica[idx] = caracteristica
                this.setTableCaracteristica(tableCaracteristica)
            }
        }
    }

    delCaracteristica(id: number): void {
        const tableCaracteristica: Caracteristica[] = this.storage.retrieve('tableCaracteristica')
        if (Array.isArray(tableCaracteristica)) {
            const idx = tableCaracteristica.findIndex(item => item.id == id)
            if (idx > -1) {
                tableCaracteristica.splice(idx, 1)
                this.setTableCaracteristica(tableCaracteristica)
            }
        }
    }

    /*** TABELA DE UNIDADES-MEDIDA */

    getTableUnidadeMedida(): UnidadeMedida[] {
        return this.storage.retrieve('tableUnidadeMedida')
    }

    setTableUnidadeMedida(tableUnidadeMedida: UnidadeMedida[]): void {
        this.storage.store('tableUnidadeMedida', tableUnidadeMedida)
    }

    addUnidadeMedida(unidadeMedida: UnidadeMedida): void {
        const tableUnidadeMedida: UnidadeMedida[] = this.storage.retrieve('tableUnidadeMedida')
        if (Array.isArray(tableUnidadeMedida)) {
            tableUnidadeMedida.push(unidadeMedida)
            this.setTableUnidadeMedida(tableUnidadeMedida)
        }
    }

    getUnidadeMedida(id: number): UnidadeMedida {
        const tableUnidadeMedida: UnidadeMedida[] = this.storage.retrieve('tableUnidadeMedida')
        return (Array.isArray(tableUnidadeMedida)) ? tableUnidadeMedida.find(item => item.id == id)
                                            : null
    }

    setUnidadeMedida(unidadeMedida: UnidadeMedida): void {
        const tableUnidadeMedida: UnidadeMedida[] = this.storage.retrieve('tableUnidadeMedida')
        if (Array.isArray(tableUnidadeMedida)) {
            const idx = tableUnidadeMedida.findIndex(item => item.id == unidadeMedida.id)
            if (idx > -1) {
                tableUnidadeMedida[idx] = unidadeMedida
                this.setTableUnidadeMedida(tableUnidadeMedida)
            }
        }
    }

    delUnidadeMedida(id: number): void {
        const tableUnidadeMedida: UnidadeMedida[] = this.storage.retrieve('tableUnidadeMedida')
        if (Array.isArray(tableUnidadeMedida)) {
            const idx = tableUnidadeMedida.findIndex(item => item.id == id)
            if (idx > -1) {
                tableUnidadeMedida.splice(idx, 1)
                this.setTableUnidadeMedida(tableUnidadeMedida)
            }
        }
    }

}