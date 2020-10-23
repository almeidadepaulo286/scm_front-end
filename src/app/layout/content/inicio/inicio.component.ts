import { Component, OnInit } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../../_services/dashboard.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

	title = 'Meu Dashboard';
	userPermissionOperacao: boolean = false;
	values;
	valuesIfError: any = {
		"contratosRecebidosDia": '-',
        "contratosRecebidosMes": '-',
        "totalContratosRecebidos": '-',
        "parcelasRecebidosDia": '-',
        "parcelasRecebidosMes": '-',
        "totalParcelasRecebidos": '-',
        "cessoesProcessadosDia": '-',
        "cessoesProcessadosMes": '-',
        "cessoesCanceladasMes": '-'
	};
	checkedValues: boolean = false

	// Icone
	faLongArrowAltRight = faLongArrowAltRight;

	painelFiltro = this.fb.group({
		cnpjDetentor: [""]
	});

	constructor(private dashboardService: DashboardService, private fb: FormBuilder, private toastr: ToastrService) { }

	ngOnInit() {
		// GET LOCALSTORAGE PERFIL
		const user = localStorage.getItem('currentUser');
		const permission = JSON.parse(user).perfis;
		
		// Permissao para usuario visualizar o filtro
		permission.map((perfil) => {
			// Operação
			if(perfil.id == perfil.id){  // FIXME
				this.userPermissionOperacao = true
			}
		})
		//FIXME this.getValues();
		this.getValuesMock();
	}

	getValues(){
		this.dashboardService.getValues().subscribe(
			res => {
				if(res.status == 200){
					if(res.result == null){
						this.values = this.valuesIfError
						this.toastr.error(`${res.message}`)
						return
					}
					this.values = res.result
				}else{
					this.values = this.valuesIfError
					this.toastr.error(`${res.message}`)
				}
			},
			err => {
				this.toastr.error('Erro inesperado')
			}
		)
	}

	getFilteredValues(cnpjDetentor){
		this.dashboardService.getFilteredValues(cnpjDetentor).subscribe(
			res => {
				if(res.status == 200){
					if(res.result == null){
						this.values = this.valuesIfError
						this.toastr.error(`${res.message}`)
						return
					}
					this.values = res.result
				}else{
					this.values = this.valuesIfError
					this.toastr.error(`${res.message}`)
				}
			},
			err => {
				this.toastr.error('Erro inesperado')
			}
		)
	}

	filtrar(){
		let { cnpjDetentor } = this.painelFiltro.value;
		this.getFilteredValues(cnpjDetentor);
	}

	limparFiltro() {
		this.painelFiltro.reset();
		this.getValues();
	}

	getValuesMock(){
		this.values = {
			"contratosRecebidosDia": 0,
			"contratosRecebidosMes": 0,
			"totalContratosRecebidos": 5,
			"parcelasRecebidosDia": 0,
			"parcelasRecebidosMes": 0,
			"totalParcelasRecebidos": 27,
			"valorParcelasRecebidasDia": 0,
			"valorParcelasRecebidasMes": 0,
			"valorParcelasRecebidasTotal": 13058,
			"cessoesProcessadosDia": 0,
			"cessoesProcessadosMes": 0,
			"valorCessoesProcessadasDia": 0,
			"valorCessoesProcessadasMes": 0,
			"cessoesCanceladasMes": 4,
			"parcelasOfertadasDia": 0,
			"parcelasOfertadasMes": 0,
			"parcelasLiberadasDia": 0,
			"parcelasLiberadasMes": 0,
			"qtdeParcelasAtualizadasDia": 0,
			"qtdeParcelasAtualizadasMes": 0,
			"valorParcelasAtualizadasDia": 0,
			"valorParcelasAtualizadasMes": 0,
			"qtdeDiasUltimaConciliacao": 192
		};
	}

}
