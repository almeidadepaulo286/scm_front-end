import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'criar-usuario',
	templateUrl: './criar-usuario.component.html',
	styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

	title = 'Novo Usuário';

	// Form
	usuarioForm = this.fb.group({
		id: [''],
		nome: ['', Validators.required],
		login: ['', Validators.required],
		email: ['', Validators.required],
		senha: [''],
		ativo: [1, Validators.required],
		perfilId: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: ['']
	});
	usuarioSubmit;

	// Select Perfis
	listaPerfis;

	constructor(
		private fb: FormBuilder,
		private usuarioService: UsuarioService,
		private toastr: ToastrService) {}

	ngOnInit() {
		// console.log(this.usuarioForm);
		this.listarPerfis()
	}

	// Lista Perfis
	listarPerfis(){
		this.usuarioService.listarPerfis().subscribe(
			res => {
				if (res.length > 0) {
					this.listaPerfis = res
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde.')
			}
		)
	}

	// Cadastra Usuário
	onSubmit() {
		this.criarUsuario();
	}

	// Cria usuario
	criarUsuario(){
		this.usuarioSubmit = {
			id: 10,
			nome: this.usuarioForm.value.nome,
			login: this.usuarioForm.value.login,
			email: this.usuarioForm.value.email,
			senha: "1234",
			ativo: this.usuarioForm.value.ativo,
			perfis: [{
				perfilId: this.usuarioForm.value.perfilId,
			}]
		}
		console.table(this.usuarioSubmit)
		this.usuarioService.criarUsuario(this.usuarioSubmit).subscribe(
			res => {
				this.toastr.success('Usuário Cadastrado com Sucesso')
				this.limpaForm()
			},
			err => {
				this.toastr.error('Não foi possível cadastrar o usuário, tente novamente mais tarde')
			}
		)
	}
	
	// Reseta Formulário
	limpaForm() {
		this.usuarioForm.reset();
	}

}
