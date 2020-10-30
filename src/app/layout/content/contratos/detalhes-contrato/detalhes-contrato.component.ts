import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faPen, faUnlock, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Contrato } from 'app/_models/contrato';
import { ContratoService } from 'app/_services/contrato.service';

@Component({
	selector: 'app-detalhes-contrato',
	templateUrl: './detalhes-contrato.component.html',
	styleUrls: ['./detalhes-contrato.component.css']
})

export class DetalhesContratoComponent implements OnInit {

	title = 'Detalhes do Contrato';

	// Icons
	faPen = faPen;
	faUnlock = faUnlock;
	faMinusCircle = faMinusCircle;

	// Data
	idContrato : number;
	contrato: Contrato;

	constructor(private route: ActivatedRoute,
				private toastr: ToastrService,
                private contratoService: ContratoService) {}

    ngOnInit(): void {
		this.idContrato = +this.route.snapshot.paramMap.get('id');
		this.getContratoById();
	}

	// Recupera dados do contrato por Id
    getContratoById(): void {
		this.contratoService.getContratoById(this.idContrato).subscribe(
			(ret) => {
				if (ret) {
					this.contrato = ret;
				} else {
					this.toastr.error('Não foi possível localizar o Contrato selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível localizar o Contrato, tente novamente mais tarde')
			}
		);
	}

}