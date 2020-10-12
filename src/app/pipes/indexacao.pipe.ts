import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'indexacao' })

export class IndexacaoPipe implements PipeTransform {
    transform(value: any) {

        switch (value) {
            case 1: {
                return 'PRÉ' 
                break;
            }
            case 2: {
                return 'DI' 
                break;
            }
            case 3: {
                return 'SELIC' 
                break;
            }
            case 4: {
                return 'IPCA' 
                break;
            }
            case 5: {
                return 'IGMP' 
                break;
            }
            default: {
                return '-'
                break;
            }
        }
    }
}