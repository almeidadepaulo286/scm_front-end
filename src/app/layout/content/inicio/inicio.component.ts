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

	// Icone
	faLongArrowAltRight = faLongArrowAltRight;

	title = 'Meu Dashboard';
	userPermissionOperacao = false;
	values;
	valuesIfError: any = {
		contratosRecebidosDia: '-',
        contratosRecebidosMes: '-',
        totalContratosRecebidos: '-'
	};
	checkedValues = false

	painelFiltro = this.fb.group({
		cnpjDetentor: ['']
	});

	constructor(private dashboardService: DashboardService,
				private fb: FormBuilder,
				private toastr: ToastrService) { }

	ngOnInit() {
		// GET LOCALSTORAGE PERFIL
		const user = JSON.parse(localStorage.getItem('currentUser'));
		const permission = user.listaPerfil;

		// Permissao para usuario visualizar o filtro
		permission.map((perfil) => {
			// Operação
			if(perfil.id === perfil.id){  // FIXME
				this.userPermissionOperacao = true
			}
		})
		// FIXME this.getValues();
		this.getValuesMock();
	}

	getValues(){
		this.dashboardService.getValues().subscribe(
			ret => {
				if (ret.Status === 200) {
					if(ret.result == null){
						this.values = this.valuesIfError
						this.toastr.error(`${ret.message}`)
						return
					}
					this.values = ret.result
				} else {
					this.values = this.valuesIfError
					this.toastr.error(`${ret.message}`)
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
				if(res.Status === 200){
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
		const { cnpjDetentor } = this.painelFiltro.value;
		this.getFilteredValues(cnpjDetentor);
	}

	limparFiltro() {
		this.painelFiltro.reset();
		this.getValues();
	}

	getValuesMock(){
		this.values = {
			contratosRecebidosDia: 0,
			contratosRecebidosMes: 0,
			totalContratosRecebidos: 5
		};
	}

}
