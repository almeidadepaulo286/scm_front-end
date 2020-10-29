import { Atividade } from './atividade';
import { Caracteristica } from './caracteristica';
import { UnidadeMedida } from './unidade-medida';

export class FatorProdutividade {
    id: number;
    codigo: string;
    indice: number;
    atividadeControle: Atividade;
    caracteristica: Caracteristica;
    unidadeMedida: UnidadeMedida;
    //
    dataInclusao?: Date;
    dataAlteracao?: Date;
}