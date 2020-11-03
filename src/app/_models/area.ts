export class Area {
    id: number;
    codigo: string;
    descricao: string;
    idUnidade: number;
    idAreaPai: number;
    subAreas: Area[];
    //
    dataInclusao?: Date;
    idUsuarioInclusao?: number;
    dataAlteracao?: Date;
    idUsuarioAlteracao?: number;
}