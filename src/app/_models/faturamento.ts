// tslint:disable:variable-name
export class Faturamento {
    quantidade_devedor: number;

    media_estoque: number;
    quantidade_parcelas: number;
    dataInicio: Date;
    dataVencimento: Date;
    cnpjEmissor: bigint;
    taxa_base: number;
    taxa_efetiva: number;
    valor_cedido: number;
    custo_base_unitario_devedor: number;
    custo_efetivo_unitario_devedor: number;
    custo_base_unitario_parcela: number;
    custo_efetivo_unitario_parcela: number;
    custo_base_unitario_estoque: number;
    custo_efetivo_unitario_estoque: number;
    valor_total_devedor: number;
    valor_total_cessao: number;
    valor_total_parcela: number;
    valor_total_estoque: number;

    valor_total_faturamento: number;
}
