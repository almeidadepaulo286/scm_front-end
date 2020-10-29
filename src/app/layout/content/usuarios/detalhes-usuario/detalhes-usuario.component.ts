import { Component, OnInit, TemplateRef } from '@angular/core';
import { faPen, faUnlock, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'app/_models/usuario';
import { UsuarioService } from 'app/_services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-detalhes-usuario',
	templateUrl: './detalhes-usuario.component.html',
	styleUrls: ['./detalhes-usuario.component.css']
})

export class DetalhesUsuarioComponent implements OnInit {

	title = 'Detalhes do Usuário';

	// Icons
	faPen = faPen;
	faUnlock = faUnlock;
	faMinusCircle = faMinusCircle;

	// Modal
    modalRef: BsModalRef;

	// Data
	idUsuario : number;
	usuario: Usuario;

	constructor(private route: ActivatedRoute,
				private usuarioService: UsuarioService,
				private modalService: BsModalService,
				private toastr: ToastrService) {}

    ngOnInit(): void {
		this.idUsuario = +this.route.snapshot.paramMap.get('id');
		this.getUsuarioById();
	}

	// Recupera dados do usuário por Id
    getUsuarioById(): void {
		this.usuarioService.getUsuarioById(this.idUsuario).subscribe(
			(ret) => {
				if (ret) {
					this.usuario = ret;
				} else {
					this.toastr.error('Não foi possível localizar o Usuário selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível localizar o Usuário, tente novamente mais tarde')
			}
		);
	}

	resetarSenha() : void {
		this.usuarioService.resetPassUsuarioById(this.idUsuario).subscribe(
			(ret) => {
				if (ret) {
					this.usuario = ret;
					this.toastr.success('Senha do Usuário Resetada com Sucesso')
				} else {
					this.toastr.error('Não foi possível resetar a senha do usuário selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível resetar a senha do Usuário, tente novamente mais tarde')
			}
		);
	}

	desativarUsuario() : void {
		this.modalRef.hide()
		this.usuarioService.disableUsuarioById(this.idUsuario).subscribe(
			(ret) => {
				if (ret) {
					this.usuario = ret;
					this.toastr.success('Usuário Desativado com Sucesso')
				} else {
					this.toastr.error('Não foi possível desativar o usuário selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível desativar o Usuário, tente novamente mais tarde')
			}
		);
	}

	// Modal
	showModalDesativar(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

}