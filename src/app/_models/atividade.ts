import { Disciplina } from './disciplina';

export class Atividade {
    id: number;
    codigo: string;
    prefixo: string;
    descricao: string;
    disciplinas?: Disciplina[];
    //
    dataInclusao?: Date;
    idUsuarioInclusao?: number;
    dataAlteracao?: Date;
    idUsuarioAlteracao?: number;
}
