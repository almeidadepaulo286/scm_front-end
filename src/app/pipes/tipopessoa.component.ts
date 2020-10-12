import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tipoPessoa' })

export class TipoPessoa implements PipeTransform{
    transform(value: any){

        if (value == 1) {
            return 'Pessoa Física';

        } else { // value == 2
            return 'Pessoa Jurídica';
        }
    }
}