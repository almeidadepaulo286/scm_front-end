import { Agentes } from './agentes';
import { ContratoValores } from './contrato-valores';
import { Garantias } from './garantias';
import { Parcelas } from './parcelas';

export class Solicitacao {           
    agentes: Agentes;
    contrato_valores: ContratoValores;
    garantias: Garantias[];
    parcelas: Parcelas[];
}


