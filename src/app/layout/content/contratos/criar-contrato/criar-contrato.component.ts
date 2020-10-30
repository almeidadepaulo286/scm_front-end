import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from 'app/_services/contrato.service';

@Component({
	selector: 'app-criar-contrato',
	templateUrl: './criar-contrato.component.html',
	styleUrls: ['./criar-contrato.component.css']
})
export class CriarContratoComponent implements OnInit {

	title = 'Novo Contrato';

	// Form
	contratoForm = this.fb.group({
		codigo: ['', Validators.required],
		descricao: ['', Validators.required],
		codigoProjeto: ['', Validators.required],
		valor: ['', Validators.required],
		dataInicial: ['', Validators.required],
        dataFinal: ['', Validators.required]
	});

	constructor(private fb: FormBuilder,
                private toastr: ToastrService,
				private contratoService: ContratoService) {}

	ngOnInit() {}

	// Reseta Formulário
	limpaForm() {
		this.contratoForm.reset();
	}

	// Cadastra Contrato
	onSubmit() {
		const contratoSubmit = {
			codigo: this.contratoForm.value.codigo,
			descricao: this.contratoForm.value.descricao,
			codigoProjeto: this.contratoForm.value.codigoProjeto,
			valor: this.contratoForm.value.valor,
			dataInicial: this.contratoForm.value.dataInicial,
			dataFinal: this.contratoForm.value.dataFinal
		}
		this.contratoService.addContrato(contratoSubmit).subscribe(
			ret => {
				this.toastr.success('Contrato Cadastrado com Sucesso')
				this.limpaForm()
			},
			err => {
				this.toastr.error('Não foi possível cadastrar o contrato, tente novamente mais tarde')
			}
		)
	}

}
