import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AtividadeService } from 'app/_services/atividade.service';
import { DisciplinaService } from 'app/_services/disciplina.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-criar-atividade',
	templateUrl: './criar-atividade.component.html',
	styleUrls: ['./criar-atividade.component.css']
})
export class CriarAtividadeComponent implements OnInit {

	title = 'Nova Atividade de Controle';

	// Form
	atividadeForm = this.fb.group({
		codigo: ['', Validators.required],
		prefixo: ['', Validators.required],
		descricao: ['', Validators.required],
		disciplinas: [[], Validators.required]
	});

	// Select Disciplinas
	listaDisciplinas;

	constructor(private fb: FormBuilder,
				private atividadeService: AtividadeService,
				private disciplinaService: DisciplinaService,
				private toastr: ToastrService) {}

	ngOnInit() {
		this.listarDisciplinas()
	}

	// Lista Disciplinas
	listarDisciplinas(){
		this.disciplinaService.getDisciplinas().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaDisciplinas = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Disciplinas, tente novamente mais tarde.')
			}
		)
	}

	// Reseta Formulário
	limpaForm() {
		this.atividadeForm.reset();
	}

	// Cadastra Atividade
	onSubmit() {
		const atividadeSubmit = {
			codigo: this.atividadeForm.value.codigo,
			prefixo: this.atividadeForm.value.prefixo,
			descricao: this.atividadeForm.value.descricao,
			disciplinas: this.atividadeForm.value.disciplinas,
			dataInclusao: new Date()
		}
		this.atividadeService.addAtividade(atividadeSubmit).subscribe(
			ret => {
				this.toastr.success('Atividade de Controle Cadastrada com Sucesso')
				this.limpaForm()
			},
			err => {
				this.toastr.error('Não foi possível cadastrar a Atividade de Controle, tente novamente mais tarde')
			}
		)
	}

}
