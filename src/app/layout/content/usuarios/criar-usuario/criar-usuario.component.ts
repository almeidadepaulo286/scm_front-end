import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ValidaDocumentoHelper } from 'app/_helpers/validaDocumento';

@Component({
	selector: 'criar-usuario',
	templateUrl: './criar-usuario.component.html',
	styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

	title = 'Novo Usuário';

	// Form
	usuarioForm = this.fb.group({
		cnpj: [''],
		cpf: ['', Validators.required],
		data_atualizacao: [''],
		data_criacao: [''],
		email: ['', Validators.required],
		empresa_id: ['', Validators.required],
		id: [''],
		nome: ['', Validators.required],
		perfilId: ['', Validators.required],
		role: [''],
		senha: [''],
		ativo: [1, Validators.required]
	});

	usuarioFormNew;

	// Select Perfis
	listaPerfis;

	// Lista Agentes Vinculados
	listaEmpresas;
	empresaSelecionada;

	constructor(
		private fb: FormBuilder,
		private usuarioService: UsuarioService,
		private toastr: ToastrService,
	){}

	ngOnInit() {
		// console.log(this.usuarioForm);
		this.listarPerfis()
		this.listarAgentes()
	}

	// Cadastra Usuário
	onSubmit() {
		this.criarUsuario();
	}

	// Reseta Formulário
	limpaForm() {
		this.usuarioForm.reset();
	}

	// Lista Perfis
	listarPerfis(){
		this.usuarioService.listarPerfis().subscribe(
			res => {
				this.listaPerfis = res
			},
			err => this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde')
		)
	}

	// Lista Agentes Vinculados
	listarAgentes(){
		this.usuarioService.listarAgentes().subscribe(
			res => {
				this.listaEmpresas = res
			},
			err => this.toastr.error('Erro inesperado ao listar agentes, tente novamente mais tarde')
		)
	}

	// Cria usuario
	criarUsuario(){
		let validCpf = ValidaDocumentoHelper.validarCPF(this.usuarioForm.value.cpf)
		if(validCpf == false){
			this.toastr.warning('Número do CPF não é válido')
			return
		}
		this.usuarioForm.value.cnpj = this.empresaSelecionada
		this.usuarioFormNew = {
			nome: this.usuarioForm.value.nome,
			cpf: this.usuarioForm.value.cpf,
			email: this.usuarioForm.value.email,
			cnpj: this.usuarioForm.value.cnpj,
			empresa_id: this.usuarioForm.value.empresa_id,
			perfis: [{
				perfilId: this.usuarioForm.value.perfilId,
			}],
			ativo: this.usuarioForm.value.ativo,
		}
		this.usuarioService.criarUsuario(this.usuarioFormNew).subscribe(
			res => {
				this.toastr.success('Usuário Cadastrado com Sucesso')
				this.limpaForm()
			},
			err => this.toastr.error('Não foi possível cadastrar o usuário, tente novamente mais tarde')
		)
	}

	setCnpjEmpresa(id){
		// console.log(this.listaEmpresas)
		this.listaEmpresas.map((item) => {
			if(item.id == id){
				this.empresaSelecionada = item.cnpj
			}
		})
	}
}
