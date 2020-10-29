import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faPen, faUnlock, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FatorProdutividade } from 'app/_models/fator-produtividade';
import { FatorProdutividadeService } from 'app/_services/fator-produtividade.service';

@Component({
	selector: 'app-detalhes-fator-produtividade',
	templateUrl: './detalhes-fator-produtividade.component.html',
	styleUrls: ['./detalhes-fator-produtividade.component.css']
})

export class DetalhesFatorProdutividadeComponent implements OnInit {

	title = 'Detalhes do Fator de Produtividade';

	// Icons
	faPen = faPen;
	faUnlock = faUnlock;
	faMinusCircle = faMinusCircle;

	// Registro
	idFatorProdutividade : number;
	fatorProdutividade: FatorProdutividade;

	constructor(private route: ActivatedRoute,
				private toastr: ToastrService,
				private fatorProdutividadeService: FatorProdutividadeService) {}

    ngOnInit(): void {
		this.idFatorProdutividade = +this.route.snapshot.paramMap.get('id');
		this.getFatorProdutividadeById();
	}

	// Recupera dados do fator de produtividade por Id
    getFatorProdutividadeById(): void {
		this.fatorProdutividadeService.getFatorProdutividadeById(this.idFatorProdutividade).subscribe(
			(registro) => {
				if (registro) {
					this.fatorProdutividade = registro;
				} else {
					this.toastr.error('Não foi possível localizar o Fator de Produtividade selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível localizar o Fator de Produtividade, tente novamente mais tarde')
			}
		);
	}

}