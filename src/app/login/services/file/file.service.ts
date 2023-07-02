import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { UploadedFile } from 'src/app/data/types/uploaded-file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const url = environment.uploadAPIUrl;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadedFile>(url, formData);
  }

  getFile(fileName: string) {
    const url = `${environment.fileAPIUrl}/${fileName}`;
    return this.http.get<string>(url);
  }
}