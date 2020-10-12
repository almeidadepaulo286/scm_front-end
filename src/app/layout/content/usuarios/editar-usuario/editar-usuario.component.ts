import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ValidaDocumentoHelper } from 'app/_helpers/validaDocumento';

@Component({
	selector: 'editar-usuario',
	templateUrl: './editar-usuario.component.html',
	styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

	title = 'Editar Usuário';

	// Form
	usuarioForm = this.fb.group({
		id: [''],
		nome: ['', Validators.required],
		cpf: ['', Validators.required],
		email: ['', Validators.required],
		cnpj: ['', Validators.required],
		empresa_id: [''],
		perfis: ['', Validators.required],
		ativo: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: [''],
		role: [''],
		senha: [''],
	});
	usuarioInfo;

	// Select Perfis
	listaPerfis;

	// Lista Agentes Vinculados
	listaAgentes;

	constructor(
		private fb: FormBuilder,
		private usuarioService: UsuarioService,
		private toastr: ToastrService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.listarAgentes()
		this.listarPerfis()
		this.getUserById();
	}

	// Cadastra Usuário
	onSubmit() {
		this.updateUser();
	}

	// Reseta Formulário
	limpaForm() {
		this.usuarioForm.reset();
	}

	// Lista Perfis
	listarPerfis() {
		this.usuarioService.listarPerfis().subscribe(
			res => {
				this.listaPerfis = res
			},
			err => this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde')
		)
	}

	// Lista Agentes Vinculados
	listarAgentes() {
		this.usuarioService.listarAgentes().subscribe(
			res => {
				this.listaAgentes = res
			},
			err => this.toastr.error('Erro inesperado ao listar agentes, tente novamente mais tarde')
		)
	}

	// Cria form preenchido
	montaUsuarioForm(usuario) {
		this.usuarioForm = this.fb.group({
			id: [usuario.id],
			nome: [usuario.nome, Validators.required],
			cpf: [usuario.cpf, Validators.required],
			email: [usuario.email, Validators.required],
			cnpj: [usuario.cnpj, Validators.required],
			empresa_id: [usuario.empresa_id],
			perfis: [usuario.perfis[0].perfilId],
			ativo: [usuario.ativo, Validators.required]
			// data_atualizacao: [usuario.data_atualizacao],
			// data_criacao: [usuario.data_criacao],
			// role: [usuario.role],
			// senha: [usuario.senha],
		});
		// console.log(this.usuarioForm.value)
	}

	// Recupera dados do usuário por Id
	getUserById() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.usuarioService.getUserById(id).subscribe(
			res => {
				this.usuarioInfo = res;
				this.montaUsuarioForm(this.usuarioInfo)
			},
			err => {
				// console.log(err)
			}
		);
	}

	// Atualiza informações do usuário
	updateUser(){
		let validCpf = ValidaDocumentoHelper.validarCPF(this.usuarioForm.value.cpf)
		if(validCpf == false){
			this.toastr.warning('Número do CPF não é válido')
			return
		}
		const perfil = this.usuarioForm.value.perfis
		this.usuarioForm.value.perfis = [{perfilId: perfil}]
		// console.log(this.usuarioForm.value)
		this.usuarioService.updateUser(this.usuarioForm.value).subscribe(
			res => {
				this.toastr.success('Usuário atualizado com sucesso')
			},
			err => {
				this.toastr.warning('Não foi possível atualizar o usuário, tente novamente mais tarde')
			}
		)
	}

}
