import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { RegistroService } from "../registro.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
	selector: "app-disponibilizar-registro",
	templateUrl: "./disponibilizar-registro.component.html",
	styleUrls: ["./disponibilizar-registro.component.css"]
})
export class DisponibilizarRegistroComponent implements OnInit {
	title = "Cessao de Ativo";
	formDispRegistro: FormGroup;
	submitted = false;
	validaForm: boolean = true;
	validaParcelas: boolean = true;
	carteiras;

	constructor(
		private formBuilder: FormBuilder,
		private registroService: RegistroService,
		private location: Location,
		private toastr: ToastrService,
		private router: Router
	){}

	ngOnInit() {
		this.createForm();
		this.getCarteiras()
	}

	createForm() {
		this.formDispRegistro = this.formBuilder.group({
			contrato: this.formBuilder.group({
				cnpj_cessionaria: ["", Validators.required],
				codigo_termo_cessao: ["", Validators.required],
				carteira: ["", Validators.required]
			}),
		});
	}

	getCarteiras(){
		this.registroService.getCarteiras().subscribe((res) => {
			this.carteiras = res;
		},
		(err) => {
			// console.log(err);
		})
	}

	onSubmit() {
		this.submitted = true;
		
		// Valida se os campos estão preenchidos
		if(!this.formDispRegistro.valid){
			this.validaForm = false
			return
		}
		this.disponibilizarRegistro(this.formDispRegistro.value.contrato);
	}

	onReset() {
		this.submitted = false;
		this.formDispRegistro.reset();
	}

	disponibilizarRegistro(objeto): void {
		// console.log(objeto);
		this.registroService.disponibilizar(objeto).subscribe(
			(res) => {
				this.onReset();
				this.toastr.success('Cessão efetuada com sucesso!');
				this.router.navigate(['/consultar-cessao']);
			},
			(err) => {
				this.toastr.error('Não foi possível disponibilizar a cessão!');
			}
		)
	}

	goBack(): void {
		this.location.back();
	}
}
