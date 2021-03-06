import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/_services/usuario.service';
import { PerfilService } from 'app/_services/perfil.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-criar-usuario',
	templateUrl: './criar-usuario.component.html',
	styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

	title = 'Novo Usuário';

	// Form
	usuarioForm = this.fb.group({
		nome: ['', Validators.required],
		login: ['', Validators.required],
		email: ['', Validators.required],
		situacao: [1, Validators.required],
		listaPerfil: [[], Validators.required]
	});

	// Select Perfis
	listaPerfis;

	constructor(private fb: FormBuilder,
				private usuarioService: UsuarioService,
				private perfilService: PerfilService,
				private toastr: ToastrService) {}

	ngOnInit() {
		this.listarPerfis()
	}

	// Lista Perfis
	listarPerfis(){
		this.perfilService.getPerfis().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaPerfis = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Perfis, tente novamente mais tarde.')
			}
		)
	}

	// Reseta Formulário
	limpaForm() {
		this.usuarioForm.reset();
	}

	// Cadastra Usuário
	onSubmit() {
		const usuarioSubmit = {
			nome: this.usuarioForm.value.nome,
			login: this.usuarioForm.value.login,
			email: this.usuarioForm.value.email,
			situacao: this.usuarioForm.value.situacao,
			senha: '1234',
			idioma: {},
			listaPerfil: this.usuarioForm.value.listaPerfil,
			dataInclusao: new Date()
		}
		this.usuarioService.addUsuario(usuarioSubmit).subscribe(
			ret => {
				this.toastr.success('Usuário Cadastrado com Sucesso')
				this.limpaForm()
			},
			err => {
				this.toastr.error('Não foi possível cadastrar o usuário, tente novamente mais tarde')
			}
		)
	}

}
