import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators'; 
import { ErrorHandlerService } from './error-handler.service'; // Certifique-se de que o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private apiUrl = 'https://mobile-api-one.vercel.app/api/travels';
  private username = 'nunoponte@ipvc.pt'; // E-mail do usuário
  private password = 'y5z@t0bZ'; // Senha do usuário

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private errorHandler: ErrorHandlerService // Injetando o serviço de tratamento de erros
  ) {}

  private createAuthorizationHeader(): HttpHeaders {
    const credentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });
  }

  // Método para mostrar o loading
  private async presentLoading(message: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: message,
    });
    await loading.present();
    return loading;
  }

  // Criar uma nova viagem
  createTravel(travel: any): Observable<any> {
    const loading = this.presentLoading('Criando viagem...');
    return this.http.post<any>(this.apiUrl, travel, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }

  // Obter todas as viagens
  getTravels(): Observable<any[]> {
    const loading = this.presentLoading('Carregando viagens...');
    return this.http.get<any[]>(this.apiUrl, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }

  // Obter uma viagem por ID
  getTravelById(id: string): Observable<any> {
    const loading = this.presentLoading('Carregando viagem...');
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())), // Dismiss o loading após a requisição
      catchError((error) => {
        this.errorHandler.handleError(error); // Chame o método de tratamento de erro
        return throwError(error); // Re-throw the error
      })
    );
  }

  // Atualizar uma viagem
  updateTravel(id: string, travelData: any): Observable<any> {
    const loading = this.presentLoading('Atualizando viagem...');
    return this.http.put<any>(`${this.apiUrl}/${id}`, travelData, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())), // Dismiss o loading após a requisição
      catchError((error) => {
        this.errorHandler.handleError(error); // Chame o método de tratamento de erro
        return throwError(error); // Re-throw the error
      })
    );
  }

  // Deletar uma viagem 
  deleteTravel(id: string): Observable<any> {
    const loading = this.presentLoading('Deletando viagem...');
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }
  // Método para criar um comentário
  createComment(travelId: string, comment: string): Observable<any> {
    const loading = this.presentLoading('Adicionando comentário...');
    const data = { travelId, comment };
    return this.http.post<any>(`${this.apiUrl}/comments`, data, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }

  // Método para deletar um comentário
  deleteComment(commentId: string): Observable<any> {
    const loading = this.presentLoading('Deletando comentário...');
    return this.http.delete(`${this.apiUrl}/locations/comments/${commentId}`, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }
}