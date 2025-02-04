import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators'; 
import { ErrorHandlerService } from './error-handler.service'; // Certifique-se de que o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class LocalService  {
  private apiUrl = 'https://mobile-api-one.vercel.app/api/travels';
  private username = 'nunoponte@ipvc.pt'; // E-mail do usuário
  private password = 'y5z@t0bZ'; // Senha do usuário

  private viagem = '';
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

    private async presentLoading(message: string): Promise<HTMLIonLoadingElement> {
      const loading = await this.loadingController.create({
        message: message,
      });
      await loading.present();
      return loading;
    }

  // Criar uma nova viagem
  createLocal(local: any): Observable<any> {
    const loading = this.presentLoading('Criando Local...');
    return this.http.post<any>(`${this.apiUrl}/locations`, local, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }
  // Obter todas as viagens
  getLocals(): Observable<any[]> {
    const loading = this.presentLoading('Carregando locais...');
    return this.http.get<any[]>(this.apiUrl, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }
  getLocalsById(localId: string): Observable<any[]> {
    const loading = this.presentLoading('Carregando locais...');
    return this.http.get<any[]>(`${this.apiUrl}/${this.viagem}/locations/${localId}`, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }
  // Obter uma viagem por ID
  getLocationsByTravelId(id: string): Observable<any> {
    this.viagem = id;
      const loading = this.presentLoading('Carregando local...');
      return this.http.get<any>(`${this.apiUrl}/${id}/locations`, { headers: this.createAuthorizationHeader() }).pipe(
        finalize(() => loading.then(l => l.dismiss())), // Dismiss o loading após a requisição
        catchError((error) => {
          this.errorHandler.handleError(error); // Chame o método de tratamento de erro
          return throwError(error); // Re-throw the error
        })
      );
    }
    getCommentsByLocationId(locationId: string) {
      // return this.http.get<any[]>(`https://mobile-api-one.vercel.app/api/travels/locations/${locationId}/comments`);
      const loading = this.presentLoading('Carregando local...');
      return this.http.get<any>(`${this.apiUrl}/locations/${locationId}`, { headers: this.createAuthorizationHeader() }).pipe(
        finalize(() => loading.then(l => l.dismiss())), // Dismiss o loading após a requisição
        catchError((error) => {
          this.errorHandler.handleError(error); // Chame o método de tratamento de erro
          return throwError(error); // Re-throw the error
        })
      );
    }
    // getLocationsByTravelId(id: string): Observable<any[]> {
    //   return this.http.get<any[]>(`${this.apiUrl}/${id}/locations`);
    // }
    // Atualizar uma viagem
  updateLocal(id: string, localData: any): Observable<any> {
    const loading = this.presentLoading('Atualizando viagem...');
    return this.http.put<any>(`${this.apiUrl}/${id}`, localData, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())), // Dismiss o loading após a requisição
      catchError((error) => {
        this.errorHandler.handleError(error); // Chame o método de tratamento de erro
        return throwError(error); // Re-throw the error
      })
    );
  }
  // Deletar uma viagem 
  deleteLocal(id: string): Observable<any> {
    const loading = this.presentLoading('Deletando local...');
    return this.http.delete(`${this.apiUrl}/locations/${id}`, { headers: this.createAuthorizationHeader() }).pipe(
      finalize(() => loading.then(l => l.dismiss())) // Dismiss o loading após a requisição
    );
  }
  // Método para criar um comentário
  createComment(commentData: { locationId: string; comment: string }): Observable<any> {
    const loading = this.presentLoading('Adicionando comentário...');
    return this.http.post<any>(`${this.apiUrl}/locations/comments`, commentData, { headers: this.createAuthorizationHeader() }).pipe(
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