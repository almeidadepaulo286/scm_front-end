import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faPen, faUnlock, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Atividade } from 'app/_models/atividade';
import { AtividadeService } from 'app/_services/atividade.service';

@Component({
	selector: 'app-detalhes-atividade',
	templateUrl: './detalhes-atividade.component.html',
	styleUrls: ['./detalhes-atividade.component.css']
})

export class DetalhesAtividadeComponent implements OnInit {

	title = 'Detalhes da Atividade de Controle';

	// Icons
	faPen = faPen;
	faUnlock = faUnlock;
	faMinusCircle = faMinusCircle;

	// Data
	idAtividade : number;
	atividade: Atividade;

	constructor(private route: ActivatedRoute,
				private toastr: ToastrService,
				private atividadeService: AtividadeService) {}

    ngOnInit(): void {
		this.idAtividade = +this.route.snapshot.paramMap.get('id');
		this.getAtividadeById();
	}

	// Recupera dados da atividade por Id
    getAtividadeById(): void {
		this.atividadeService.getAtividadeById(this.idAtividade).subscribe(
			(ret) => {
				if (ret) {
					this.atividade = ret;
				} else {
					this.toastr.error('Não foi possível localizar a Atividade de Controle selecionada')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível localizar a Atividade de Controle, tente novamente mais tarde')
			}
		);
	}

}