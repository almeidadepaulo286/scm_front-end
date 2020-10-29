import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FatorProdutividadeService } from 'app/_services/fator-produtividade.service';
import { AtividadeService } from 'app/_services/atividade.service';
import { CaracteristicaService } from 'app/_services/caracteristica.service';
import { UnidadeMedidaService } from 'app/_services/unidade-medida.service';

@Component({
	selector: 'app-editar-fator-produtividade',
	templateUrl: './editar-fator-produtividade.component.html',
	styleUrls: ['./editar-fator-produtividade.component.css']
})
export class EditarFatorProdutividadeComponent implements OnInit {

	title = 'Editar Fator de Produtividade';

	// Registro
	idFatorProdutividade : number;

	// Form para o Registro
	formRegistro = this.fb.group({
		codigo: ['', Validators.required],
		indice: ['', Validators.required],
		idAtividadeControle: ['', Validators.required],
		idCaracteristica: ['', Validators.required],
		idUnidadeMedida: ['', Validators.required]
	});

	// listas de selecao:
	listaAtividadesControle;
	listaCaracteristicas;
	listaUnidadesMedida;

	constructor(private route: ActivatedRoute,
				private fb: FormBuilder,
				private toastr: ToastrService,
				private fatorProdutividadeService: FatorProdutividadeService,
				private atividadeService: AtividadeService,
				private caracteristicaService: CaracteristicaService,
				private unidadeMedidaService: UnidadeMedidaService) {}

	ngOnInit() {
		this.idFatorProdutividade = +this.route.snapshot.paramMap.get('id');
		this.listarAtividadesControle()
		this.listarCaracteristicas()
		this.listarUnidadesMedida()
		this.getFatorProdutividadeById();
	}

	// Lista de Atividades de Controle
	listarAtividadesControle(){
		this.atividadeService.getAtividades().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaAtividadesControle = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Atividades de Controle, tente novamente mais tarde.')
			}
		)
	}

	// Lista de Atividades de Controle
	listarCaracteristicas(){
		this.caracteristicaService.getCaracteristicas().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaCaracteristicas = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Características, tente novamente mais tarde.')
			}
		)
	}

	// Lista de Atividades de Controle
	listarUnidadesMedida(){
		this.unidadeMedidaService.getUnidadesMedida().subscribe(
			ret => {
				if (Array.isArray(ret) && ret.length > 0) {
					this.listaUnidadesMedida = ret
				}
			},
			err => {
				this.toastr.error('Erro inesperado ao listar Unidades de Medida, tente novamente mais tarde.')
			}
		)
	}

	// Recupera dados do fator de produtividade por Id
    getFatorProdutividadeById(): void {
		this.fatorProdutividadeService.getFatorProdutividadeById(this.idFatorProdutividade)
		                              .subscribe(
			(registro) => {
				if (registro) {
					// Cria form preenchido
					this.formRegistro = this.fb.group({
						codigo: [registro.codigo, Validators.required],
						indice: [registro.indice, Validators.required],
						idAtividadeControle: [registro.atividadeControle.id, Validators.required],
						idCaracteristica: [registro.caracteristica.id, Validators.required],
						idUnidadeMedida: [registro.unidadeMedida.id, Validators.required]
					});
				} else {
					this.toastr.error('Não foi possível localizar o Fator de Produtividade selecionado')
				}
			},
			(err) => {
				this.toastr.warning('Não foi possível localizar o Fator de Produtividade, tente novamente mais tarde')
			}
		);
	}

	// Atualiza informações do fator de produtividade:
	onSubmit() {
		const stFatorProdutividade = {
			id: this.idFatorProdutividade,
			codigo: this.formRegistro.value.codigo,
			indice: this.formRegistro.value.indice,
			atividadeControle: this.listaAtividadesControle.find(item => item.id == this.formRegistro.value.idAtividadeControle),
			caracteristica: this.listaCaracteristicas.find(item => item.id == this.formRegistro.value.idCaracteristica),
			unidadeMedida: this.listaUnidadesMedida.find(item => item.id == this.formRegistro.value.idUnidadeMedida)
		}
		this.fatorProdutividadeService.setFatorProdutividadeById(this.idFatorProdutividade, stFatorProdutividade)
		                              .subscribe(
			(ret) => {
				this.toastr.success('Fator de Produtividade atualizado com sucesso')
			},
			(err) => {
				this.toastr.warning('Não foi possível atualizar o Fator de Produtividade, tente novamente mais tarde')
			}
		)
	}

}