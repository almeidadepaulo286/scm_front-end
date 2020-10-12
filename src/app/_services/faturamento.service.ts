import { Faturamento } from './../_models/faturamento';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../environments/environment';
import { log } from 'util';


@Injectable()
export class FaturamentoService {
    days: number;
    date: string;
    constructor(private http: HttpClient) { }



    getFaturamento(faturamento: Faturamento): Observable<Faturamento> {

        this.date =this.alertYear(faturamento.dataInicio, faturamento.dataVencimento);
        
        return this.http.get<Faturamento>(`${environment.baseUrlBilling}/faturamento?dataInicio=${faturamento.dataVencimento}-${faturamento.dataInicio}-01&dataVencimento=${this.date}&cnpjEmissor=${this.formatCnpj(faturamento.cnpjEmissor)}`);
    }


    alertYear(month, year){   
        if(month >= '12' ){
            month = '01';
            let ano = parseInt(year);
            return `${ano + 1}-${month}-01`;            
        }
        let mes = parseInt(month)
        return `${year}-${this.pad((mes+1),2)}-01`;
    }

    formatCnpj(cnpj){
      return this.pad(cnpj,14)
    }

    pad(str, tamanho){
        let resto = tamanho - String(str).length;
        return '0'.repeat(resto > 0 ? resto : 0) + str;
    }
}
