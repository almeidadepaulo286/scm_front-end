import { CnpjValidator } from './../../../shared/validators/cnpj.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaturamentoService } from './../../../_services/faturamento.service';
import { Component, OnInit } from '@angular/core';
import { Faturamento } from '../../../_models/faturamento';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    form: FormGroup;
    today = new Date();
    faCalendar = faCalendar;
    user: string;
    result = {
        cnpjEmissor: '...',
        custoBaseUnitarioDevedor: 0,
        custoBaseUnitarioEstoque: 0,
        custoBaseUnitarioParcela: 0,
        custoEfetivoUnitarioDevedor: 0,
        custoEfetivoUnitarioEstoque: 0,
        custoEfetivoUnitarioParcela: 0,
        dataInicio: '...',
        dataVencimento: '...',
        mediaEstoque: 0,
        quantidadeDevedor: 0,
        quantidadeParcelas: 0,
        valor_cedido: 0,
        taxaBase: 0,
        taxaEfetiva: 0,
        valorTotalCessao: 0,
        valorTotalDevedor: 0,
        valorTotalEstoque: 0,
        valorTotalFaturamento: 0,
        valorTotalParcela: 0,
    };


    constructor(
        private faturamentoService: FaturamentoService,
        private fb: FormBuilder
    ) { }


    ngOnInit() {
        this.form = this.fb.group({
            dataInicio: ['', [Validators.required]],
            dataVencimento: ['', [Validators.required]],
            cnpjEmissor: ['', [Validators.required, CnpjValidator]]
        });
        this.user = localStorage.getItem('currentUser');

    }



    onSubmit() {
        if (this.user != null) {
            this.result = {
                cnpjEmissor: '...',
                custoBaseUnitarioDevedor: 0,
                custoBaseUnitarioEstoque: 0,
                custoBaseUnitarioParcela: 0,
                custoEfetivoUnitarioDevedor: 0,
                custoEfetivoUnitarioEstoque: 0,
                custoEfetivoUnitarioParcela: 0,
                dataInicio: '...',
                dataVencimento: '...',
                valor_cedido: 0,
                mediaEstoque: 0,
                quantidadeDevedor: 0,
                quantidadeParcelas: 0,

                taxaBase: 0,
                taxaEfetiva: 0,
                valorTotalCessao: 0,
                valorTotalDevedor: 0,
                valorTotalEstoque: 0,
                valorTotalFaturamento: 0,
                valorTotalParcela: 0,
            };
            this.result.dataInicio = this.form.value.dataInicio;
            this.result.dataVencimento = this.form.value.dataVencimento;

            this.faturamentoService.getFaturamento(this.form.value).subscribe(res => {
                this.result.quantidadeDevedor = res.quantidade_devedor;
                this.result.quantidadeParcelas = res.quantidade_parcelas;
                this.result.mediaEstoque = res.media_estoque;
                this.result.custoBaseUnitarioParcela = res.custo_base_unitario_parcela;
                this.result.custoEfetivoUnitarioParcela = res.custo_efetivo_unitario_parcela;
                this.result.custoEfetivoUnitarioEstoque = res.custo_efetivo_unitario_estoque * 100;
                this.result.custoBaseUnitarioEstoque = res.custo_base_unitario_estoque * 100;
                this.result.custoBaseUnitarioDevedor = res.custo_base_unitario_devedor;
                this.result.valor_cedido = res.valor_cedido;
                this.result.custoEfetivoUnitarioDevedor = res.custo_efetivo_unitario_devedor;
                this.result.taxaBase = res.taxa_base * 100;
                this.result.taxaEfetiva = res.taxa_efetiva * 100;
                this.result.valorTotalFaturamento = res.valor_total_faturamento;
                this.result.valorTotalEstoque = res.valor_total_estoque;
                this.result.valorTotalCessao = res.valor_total_cessao;
                this.result.valorTotalDevedor = res.valor_total_devedor;
                this.result.valorTotalParcela = res.valor_total_parcela;

                // console.log('RES:', res);
            }, error => {
                // console.log('ERROR', error);
            });
        } else {
            window.location.href = 'login'
        }
    }


}

