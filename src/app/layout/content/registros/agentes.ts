import { Credores } from './credores';
import { Devedores } from './devedores';

export class Agentes {
    originador_cnpj: String;
    detentor_carteira: String;    
    detentor_cnpj: String;                
    garantidor_tipo_pessoa: String;
    garantidor_numero_documento: String;
    garantidor_cep: String;
    beneficiario_tipo_pessoa: String;
    beneficiario_numero_documento: String;
    beneficiario_banco_credito: String;
    beneficiario_agencia_credito: String;
    beneficiario_conta_corrente_credito: String;
    credores: Credores[];
    devedores: Devedores[];
}

