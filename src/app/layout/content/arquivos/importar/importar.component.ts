import { Component, ElementRef, ViewChild, OnInit } from '@angular/core'
import { RegistroService } from '../../../../_services/registro.service'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { ApiResponse } from 'app/_models/api.response'
import { UploadService } from 'app/_services/upload.service';

@Component({
    selector: 'app-importar-registro',
    templateUrl: './importar.component.html',
    styleUrls: ['./importar.component.css'],
})
export class ImportarComponent implements OnInit {
    @ViewChild('labelImport', { static: false })
    labelImport: ElementRef

    title = 'Importar Arquivo'

    faFilter = faFilter

    formImport: FormGroup
    fileToUpload: File = null
    fileName: String = '';

	submitted = false

    get f() {
        return this.formImport.controls
    }

    ngOnInit() {
        this.formImport = new FormGroup({
            importFile: new FormControl('', Validators.required)
        })
    }

    constructor(
        private uploadService: UploadService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    onFileChange(files: FileList) {
        this.fileName = files[0].name
        this.fileToUpload = files.item(0)
    }

    import(): void {
        this.submitted = true

        if (
            this.formImport.controls.importFile.value === ''
        ) {
            return
        }

        const data = {
            file: this.fileToUpload,
        }
        this.uploadService.envioArquivoRegistro(data).subscribe(
            (result: ApiResponse) => {
                if (result.status === 400) {
                    this.toastr.error(
                        'Erro ao importar registro: ' + result.message,
                        ''
                    )
                    this.router.navigate(['/arquivos/consultar'])
                } else {
                    this.toastr.success(
                        result.message,
                        'Importação de arquivo'
                    )
                    this.router.navigate(['/arquivos/consultar'])
                }
            },
            err => {
                this.toastr.error(
                    'Erro ao importar arquivo, tente novamente!',
                    ''
                )
                this.router.navigate(['/arquivos/consultar'])
            }
        )
    }
}