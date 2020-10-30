import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from 'app/_services/contrato.service';

@Component({
	selector: 'app-editar-contrato',
	templateUrl: './editar-contrato.component.html',
	styleUrls: ['./editar-contrato.component.css']
})
export class EditarContratoComponent implements OnInit {

	title = 'Editar Contrato';

	// Data
	idContrato : number;

	// Form
	contratoForm = this.fb.group({
		codigo: ['', Validators.required],
		descricao: ['', Validators.required],
		codigoProjeto: ['', Validators.required],
		valor: ['', Validators.required],
		dataInicial: ['', Validators.required],
        dataFinal: ['', Validators.required]
	});

	constructor(private route: ActivatedRoute,
                private fb: FormBuilder,
                private toastr: ToastrService,
				private contratoService: ContratoService) {}

	ngOnInit() {
		this.idContrato = +this.route.snapshot.paramMap.get('id');
		this.getContratoById();
	}


	// Recupera dados do contrato por Id
	getContratoById(): void {
		this.contratoService.getContratoById(this.idContrato).subscribe(
			(item) => {
				if (item) {
					// Cria form preenchido
					this.contratoForm = this.fb.group({
						codigo: [item.codigo, Validators.required],
						descricao: [item.descricao, Validators.required],
						codigoProjeto: [item.codigoProjeto, Validators.required],
						valor: [item.valor, Validators.required],
						dataInicial: [item.dataInicial, Validators.required],
						dataFinal: [item.dataFinal, Validators.required]
					});
				} else {
					this.toastr.error('Não foi possível localizar o contrato selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível localizar o contrato, tente novamente mais tarde')
			}
		);
	}

	// Atualiza informações do contrato
	onSubmit() {
		const stContrato = {
			codigo: this.contratoForm.value.codigo,
			descricao: this.contratoForm.value.descricao,
			codigoProjeto: this.contratoForm.value.codigoProjeto,
			valor: this.contratoForm.value.valor,
			dataInicial: this.contratoForm.value.dataInicial,
			dataFinal: this.contratoForm.value.dataFinal
		}
		this.contratoService.setContratoById(this.idContrato, stContrato).subscribe(
			(ret) => {
				this.toastr.success('Contrato atualizado com sucesso')
			},
			(err) => {
				this.toastr.warning('Não foi possível atualizar o contrato, tente novamente mais tarde')
			}
		)
	}

}