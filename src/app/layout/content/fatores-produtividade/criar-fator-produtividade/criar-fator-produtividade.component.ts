import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FatorProdutividadeService } from 'app/_services/fator-produtividade.service';
import { AtividadeService } from 'app/_services/atividade.service';
import { CaracteristicaService } from 'app/_services/caracteristica.service';
import { UnidadeMedidaService } from 'app/_services/unidade-medida.service';

@Component({
	selector: 'app-criar-fator-produtividade',
	templateUrl: './criar-fator-produtividade.component.html',
	styleUrls: ['./criar-fator-produtividade.component.css']
})
export class CriarFatorProdutividadeComponent implements OnInit {

	title = 'Novo Fator de Produtividade';

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

	constructor(private fb: FormBuilder,
				private toastr: ToastrService,
				private fatorProdutividadeService: FatorProdutividadeService,
				private atividadeService: AtividadeService,
				private caracteristicaService: CaracteristicaService,
				private unidadeMedidaService: UnidadeMedidaService) {}

	ngOnInit() {
		this.listarAtividadesControle()
		this.listarCaracteristicas()
		this.listarUnidadesMedida()
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

	// Reseta Formulário
	limpaForm() {
		this.formRegistro.reset();
	}

	// Cadastra o fator de produtividade
	onSubmit() {
		const stFatorProdutividade = {
			codigo: this.formRegistro.value.codigo,
			indice: this.formRegistro.value.indice,
			atividadeControle: this.listaAtividadesControle.find(item => item.id == this.formRegistro.value.idAtividadeControle),
			caracteristica: this.listaCaracteristicas.find(item => item.id == this.formRegistro.value.idCaracteristica),
			unidadeMedida: this.listaUnidadesMedida.find(item => item.id == this.formRegistro.value.idUnidadeMedida)
		}
		this.fatorProdutividadeService.addFatorProdutividade(stFatorProdutividade)
		                              .subscribe(
			ret => {
				this.toastr.success('Fator de Produtividade Cadastrado com Sucesso')
				this.limpaForm()
			},
			err => {
				this.toastr.error('Não foi possível cadastrar o Fator de Produtividade, tente novamente mais tarde')
			}
		)
	}

}
