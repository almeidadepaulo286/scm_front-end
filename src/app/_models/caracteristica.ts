export class Caracteristica {
    id: number;
    nome: string;
    tipo: number; // 1 Descritivo 2 Quantitativo
    tipoDado: number; // 1 Caracter 2 Numérico
    //
    dataInclusao?: Date;
    idUsuarioInclusao?: number;
    dataAlteracao?: Date;
    idUsuarioAlteracao?: number;
}