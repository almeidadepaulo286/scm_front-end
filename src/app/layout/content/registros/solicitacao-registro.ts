import { Solicitacao } from './solicitacao';

export class SolicitacaoRegistro {
    id: number;
    version: String;
    protocolo: String;
    solicitante: String;
    tipo_evento: String;
    data_evento: String;
    status: String;
    solicitacao: Solicitacao;
}