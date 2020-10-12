import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusCessao' })

export class StatusCessaoPipe implements PipeTransform {
    transform(value: any) {

        switch (value) {
            case 1: {
                return 'Ofertada' 
                break;
            }
            case 2: {
                return 'Aguardando Liberação' 
                break;
            }
            case 3: {
                return 'Concluida' 
                break;
            }
            case 4: {
                return 'Suspensa' 
                break;
            }
            case 5: {
                return 'Cancelada' 
                break;
            }
            default: {
                return '-'
                break;
            }
        }
    }
}