import { CessaoContrato } from "./cessaoContrato";
import { CessaoParcela } from "./cessaoParcela";
import { CessaoCessao } from "./cessaoCessao";

export class Cessao {
	contrato: CessaoContrato;
	parcela: CessaoParcela;
	cessao: CessaoCessao;
}
