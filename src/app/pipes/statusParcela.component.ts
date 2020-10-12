import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusParcela' })

export class StatusParcelaPipe implements PipeTransform {
    transform(value: any) {

        switch (value) {
            case 1: {
                return 'Aceita' 
                break;
            }
            case 2: {
                return 'Recusada' 
                break;
            }
            case 3: {
                return 'Cancelada' 
                break;
            }
            case 4: {
                return 'Ofertada' 
                break;
            }
            case 5: {
                return 'Liberada' 
                break;
            }
            case 6: {
                return 'Suspensa' 
                break;
            }
            case 7: {
                return 'Liquidada' 
                break;
            }
            case 8: {
                return 'Vencida' 
                break;
            }
            case 9: {
                return 'Pendente' 
                break;
            }
            default: {
                return '-'
                break;
            }
        }
    }
}