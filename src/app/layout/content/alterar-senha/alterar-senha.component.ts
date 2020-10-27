import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'app/_models/usuario';
import { AlterarSenhaService } from 'app/_services/alterar-senha.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/_services';

// Icones
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/_models';

@Component({
	selector: 'app-alterar-senha',
	templateUrl: './alterar-senha.component.html',
})
export class AlterarSenhaComponent implements OnInit {

	title = 'Alterar Senha';

	// Form
	formAlterarSenha: FormGroup;

	// Alerta Validação
	validaSenha: boolean = true;
	validaForm: boolean = true;

	// Usuário logado
	usuario: Usuario;

	// Icone
	faAddressCard = faSearch;

	constructor(private location: Location,
				private formBuilder: FormBuilder,
				private alterarSenhaService: AlterarSenhaService,
				private authenticationService: AuthenticationService,
				private toastr: ToastrService) {}

	ngOnInit() {
		this.usuario = this.authenticationService.CurrentUsuario

		this.formAlterarSenha = this.formBuilder.group({
			novaSenha: ['', Validators.required],
			novaSenhaConfirmacao: ['', Validators.required]
		})
	}

	valida(){
		const senha = this.formAlterarSenha.value.novaSenha;
		const senhaConfirm = this.formAlterarSenha.value.novaSenhaConfirmacao;

		if(senha != senhaConfirm){
			this.validaSenha = false;
			return
		}

		if(senha == '' || senhaConfirm == ''){
			this.validaForm = false
			return
		}

		this.validaForm = true;
		this.validaSenha = true;
	}

	onSubmit(){
		this.valida();
		this.alterarSenhaService.atualizarSenha(this.formAlterarSenha.value.novaSenha, this.usuario.id).subscribe(
			(res) => {
				this.formAlterarSenha.reset();
				this.toastr.success('Senha alterada com sucesso!');
			},
			(err) => {
				this.toastr.warning('Não foi possível alterar sua senha!');
			})
	}

	goBack(): void {
		this.location.back();
	}
}
