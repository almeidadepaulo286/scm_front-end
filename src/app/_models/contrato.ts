export class Contrato {
    id: number;
    codigo: string;
    descricao: string;
    codigoProjeto: string;
    valor?: number;
    dataInicial?: Date;
    dataFinal?: Date;
    arranjoFisico: object;
    //
    dataInclusao?: Date;
    idUsuarioInclusao?: number;
    dataAlteracao?: Date;
    idUsuarioAlteracao?: number;
}