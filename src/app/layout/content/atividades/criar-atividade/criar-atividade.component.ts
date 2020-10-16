import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AtividadeService } from 'app/_services/atividade.service';
import { ToastrService } from 'ngx-toastr';
import { ValidaDocumentoHelper } from 'app/_helpers/validaDocumento';

@Component({
	selector: 'criar-atividade',
	templateUrl: './criar-atividade.component.html',
	styleUrls: ['./criar-atividade.component.css']
})
export class CriarAtividadeComponent implements OnInit {

	title = 'Nova Atividade de Controle';

	// Form
	atividadeForm = this.fb.group({
		id: [''],
		nome: ['', Validators.required],
		codigo: ['', Validators.required],
		descricao: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: [''],
		disciplinaId: ['', Validators.required]
	});

	atividadeFormNew;

	// Select Disciplinas
	listaDisciplinas;

	constructor(
		private fb: FormBuilder,
		private atividadeService: AtividadeService,
		private toastr: ToastrService,
	){}

	ngOnInit() {
		// console.log(this.atividadeForm);
		this.listarDisciplinas()
	}

	// Cadastra Atividade
	onSubmit() {
		this.criarAtividade();
	}

	// Reseta Formulário
	limpaForm() {
		this.atividadeForm.reset();
	}

	// Lista Disciplinas
	listarDisciplinas(){
		this.atividadeService.listarDisciplinas().subscribe(
			res => {
				this.listaDisciplinas = res
			},
			err => this.toastr.error('Erro inesperado ao listar Disciplinas, tente novamente mais tarde')
		)
	}

	// Cria atividade
	criarAtividade(){
		this.atividadeFormNew = {
			codigo: this.atividadeForm.value.codigo,
			prefixo: this.atividadeForm.value.prefixo,
			descricao: this.atividadeForm.value.descricao,
			disciplinas: [{
				id: this.atividadeForm.value.disciplinaId,
			}]
		}
		this.atividadeService.criarAtividade(this.atividadeFormNew).subscribe(
			res => {
				this.toastr.success('Atividade de Controle Cadastrada com Sucesso')
				this.limpaForm()
			},
			err => this.toastr.error('Não foi possível cadastrar a Atividade de Controle, tente novamente mais tarde')
		)
	}
}
