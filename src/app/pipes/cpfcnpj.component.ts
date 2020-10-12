import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpfCnpj' })

export class CpfCnpj implements PipeTransform{
    transform(value: any){

        // Ignora caso venham sem valores
        if(value == null || value == undefined){
            return
        }
        
        // Remove caracteres especiais
        value = value.toString().replace(/\D/g,"")

        if (value.length < 14) { //CPF
 
            //Coloca um ponto entre o terceiro e o quarto dígitos
            value = value.toString().replace(/(\d{3})(\d)/,"$1.$2")
     
            //Coloca um ponto entre o terceiro e o quarto dígitos
            //de novo (para o segundo bloco de números)
            value = value.toString().replace(/(\d{3})(\d)/,"$1.$2")
     
            //Coloca um hífen entre o terceiro e o quarto dígitos
            value = value.toString().replace(/(\d{3})(\d{1,2})$/,"$1-$2")
     
            return value;

        } else { //CNPJ
     
            //Coloca ponto entre o segundo e o terceiro dígitos
            value = value.toString().replace(/^(\d{2})(\d)/,"$1.$2")
     
            //Coloca ponto entre o quinto e o sexto dígitos
            value = value.toString().replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
     
            //Coloca uma barra entre o oitavo e o nono dígitos
            value = value.toString().replace(/\.(\d{3})(\d)/,".$1/$2")
     
            //Coloca um hífen depois do bloco de quatro dígitos
            value = value.toString().replace(/(\d{4})(\d)/,"$1-$2")
     
            return value;
        }
    }
}