import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AtividadeService } from 'app/_services/atividade.service';
import { DisciplinaService } from 'app/_services/disciplina.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-editar-atividade',
	templateUrl: './editar-atividade.component.html',
	styleUrls: ['./editar-atividade.component.css']
})
export class EditarAtividadeComponent implements OnInit {

	title = 'Editar Atividade de Controle';

	// Data
	idAtividade : number;

	// Form
	atividadeForm = this.fb.group({
		id: [''],
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
				private toastr: ToastrService,
				private route: ActivatedRoute) {}

	ngOnInit() {
		this.idAtividade = +this.route.snapshot.paramMap.get('id');

		this.listarDisciplinas()
		this.getAtividadeById();
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

	// Recupera dados do atividade por Id
	getAtividadeById(): void {
		this.atividadeService.getAtividadeById(this.idAtividade).subscribe(
			(item) => {
				if (item) {
					// Cria form preenchido
					this.atividadeForm = this.fb.group({
						codigo: [item.codigo, Validators.required],
						prefixo: [item.prefixo, Validators.required],
						descricao: [item.descricao, Validators.required],
						disciplinas: [item.disciplinas, Validators.required]
					});
				} else {
					this.toastr.error('Não foi possível localizar a Atividade de Controle selecionada')
				}
			},
			(err) => {
				console.log(err)
			}
		);
	}

	// Atualiza informações da atividade de controle
	onSubmit() {
		const stAtividade = {
			codigo: this.atividadeForm.value.codigo,
			prefixo: this.atividadeForm.value.prefixo,
			descricao: this.atividadeForm.value.descricao,
			disciplinas: this.atividadeForm.value.disciplinas
		}
		this.atividadeService.setAtividadeById(this.idAtividade, stAtividade).subscribe(
			(ret) => {
				this.toastr.success('Atividade de Controle atualizada com sucesso')
			},
			(err) => {
				this.toastr.warning('Não foi possível atualizar a Atividade de Controle, tente novamente mais tarde')
			}
		)
	}

}