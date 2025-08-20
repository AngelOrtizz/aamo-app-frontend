import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { UsuarioResponse } from '../../../shared/models/usuario.interface';
import { DefaultResponse } from '../../../shared/models/default.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${environment.API_URL}/usuarios`, {
      headers: this.getAuthHeaders()
    }).pipe(catchError((error) => this.handlerError(error)));
  }

  newUsuario(usuario: UsuarioResponse): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${environment.API_URL}/usuarios`, usuario, {
      headers: this.getAuthHeaders()
    }).pipe(catchError((error) => this.handlerError(error)));
  }

  updateUsuario(usuario: UsuarioResponse): Observable<DefaultResponse> {
    return this.http.patch<DefaultResponse>(`${environment.API_URL}/usuarios/${usuario.id_usuario}`, usuario, {
      headers: this.getAuthHeaders()
    }).pipe(catchError((error) => this.handlerError(error)));
  }

  deleteUsuario(id_usuario: number): Observable<DefaultResponse> {
    return this.http.delete<DefaultResponse>(`${environment.API_URL}/usuarios/${id_usuario}`, {
      headers: this.getAuthHeaders()
    }).pipe(catchError((error) => this.handlerError(error)));
  }

  handlerError(error: any): Observable<never> {
    var errorMessage = "Ocurrió un error";
    if (error.error) {
      errorMessage = `Error: ${error.error.mensaje}`;
    }
    this.snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
    return throwError(() => new Error(errorMessage));
  }
}
