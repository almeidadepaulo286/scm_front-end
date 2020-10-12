import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { LocalService } from './local.service';
import { ResponseEntity } from 'app/_models/ResponseEntity';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' }) 
export class UploadService {

    uploadUrl: string = environment.baseUrl+'cerc/registros/upload-cnab';

    constructor(
        private http: HttpClient,
        private localService: LocalService
    ){}

    envioArquivoRegistro(data: any) {
        const formData: FormData = new FormData()
        formData.append('file', data.file, data.file.name)
        // formData.append('layout', data.layout)
        const headers = new HttpHeaders()
        headers.append('Content-Type', 'multipart/form-data')
        headers.append('Accept', 'application/json')
        return this.http.post(
            this.uploadUrl,
            formData,
            { headers }
        )
    }
}