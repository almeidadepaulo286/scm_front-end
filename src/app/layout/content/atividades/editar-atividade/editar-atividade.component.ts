import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AtividadeService } from 'app/_services/atividade.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ValidaDocumentoHelper } from 'app/_helpers/validaDocumento';

@Component({
	selector: 'editar-atividade',
	templateUrl: './editar-atividade.component.html',
	styleUrls: ['./editar-atividade.component.css']
})
export class EditarAtividadeComponent implements OnInit {

	title = 'Editar Atividade de Controle';

	// Form
	atividadeForm = this.fb.group({
		id: [''],
		codigo: ['', Validators.required],
		prefixo: ['', Validators.required],
		descricao: ['', Validators.required],
		disciplinas: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: ['']
	});
	atividadeInfo;

	// Select Disciplinas
	listaDisciplinas;

	constructor(
		private fb: FormBuilder,
		private atividadeService: AtividadeService,
		private toastr: ToastrService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.listarDisciplinas()
		this.getActivityById();
	}

	// Cadastra Atividade de Controle
	onSubmit() {
		this.updateActivity();
	}

	// Reseta Formulário
	limpaForm() {
		this.atividadeForm.reset();
	}

	// Lista Disciplinas
	listarDisciplinas() {
		this.atividadeService.listarDisciplinas().subscribe(
			res => {
				this.listaDisciplinas = res.content
			},
			err => this.toastr.error('Erro inesperado ao listar Disciplinas, tente novamente mais tarde')
		)
	}

	// Cria form preenchido
	montaAtividadeForm(atividade) {
		this.atividadeForm = this.fb.group({
			id: [atividade.id],
			codigo: [atividade.codigo, Validators.required],
			prefixo: [atividade.prefixo, Validators.required],
			descricao: [atividade.descricao, Validators.required],
			disciplinas: [atividade.disciplinas[0].id]
			// data_atualizacao: [atividade.data_atualizacao],
			// data_criacao: [atividade.data_criacao],
		});
		// console.log(this.atividadeForm.value)
	}

	// Recupera dados da atividade por Id
	getActivityById() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.atividadeService.getActivityById(id).subscribe(
			res => {
				this.atividadeInfo = res;
				this.montaAtividadeForm(this.atividadeInfo)
			},
			err => {
				// console.log(err)
			}
		);
	}

	// Atualiza informações da atividade
	updateActivity(){
		const disciplina = this.atividadeForm.value.disciplinas
		this.atividadeForm.value.disciplinas = [{disciplinaId: disciplina}]
		// console.log(this.atividadeForm.value)
		this.atividadeService.updateActivity(this.atividadeForm.value).subscribe(
			res => {
				this.toastr.success('Atividade de Controle atualizada com sucesso')
			},
			err => {
				this.toastr.warning('Não foi possível atualizar a atividade de controle, tente novamente mais tarde')
			}
		)
	}

}
