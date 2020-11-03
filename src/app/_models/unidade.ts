import { Area } from './area';
import { Sop } from './sop';

export class Unidade {
    id: number;
    codigo: string;
    descricao: string;
    prefixo: string;
    idContrato: number;
    idUnidadePai: number;
    areas: Area[];
    sops: Sop[];
    //
    dataInclusao?: Date;
    idUsuarioInclusao?: number;
    dataAlteracao?: Date;
    idUsuarioAlteracao?: number;
}