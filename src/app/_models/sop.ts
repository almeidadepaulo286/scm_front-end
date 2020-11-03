export class Sop {
    id: number;
    codigo: string;
    descricao: string;
    idUnidade: number;
    idSopPai: number;
    subSops: Sop[];
    //
    dataInclusao?: Date;
    idUsuarioInclusao?: number;
    dataAlteracao?: Date;
    idUsuarioAlteracao?: number;
}