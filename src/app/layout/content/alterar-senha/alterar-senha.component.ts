import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlterarSenhaService } from 'app/_services/alterar-senha.service';
import { ToastrService } from 'ngx-toastr';

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
	
	// CPF Usuário logado
	cpfUser;

	// Icone
	faAddressCard = faSearch;

	constructor(
		private location: Location,
		private formBuilder: FormBuilder,
		private alterarSenhaService: AlterarSenhaService,
		private toastr: ToastrService
	){}

	ngOnInit() {
		this.formAlterarSenha = this.formBuilder.group({
			novaSenha: ["", Validators.required],
			novaSenhaConfirmacao: ["", Validators.required]
		})
	}

	valida(){
		let senha = this.formAlterarSenha.value.novaSenha;
		let senhaConfirm = this.formAlterarSenha.value.novaSenhaConfirmacao;

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

	getCpf(){
		const user = localStorage.getItem('currentUser');
		const cpfUser = JSON.parse(user).cpf;
        // this.userPerfil = perfis[0].perfilId;
		this.cpfUser = cpfUser;
	}
	
	onSubmit(){
		this.valida();
		this.getCpf();
		this.alterarSenhaService.atualizarSenha(this.formAlterarSenha.value.novaSenha, this.cpfUser).subscribe(
			(res) => {
				// console.log(res);
				this.formAlterarSenha.reset();
				this.toastr.success('Senha alterada com sucesso!');
			},
			(err) => {
				// console.log('error');
				this.toastr.warning('Não foi possível alterar sua senha!');
			})
	}

	goBack(): void {
		this.location.back();
	}
}

64777303080