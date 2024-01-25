import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  

  addNewUser(dados: any): Observable<any>{
    return this.http.post('http://localhost:8000/api/newUser', dados);
  }

  doLogin(dados: any): Observable<any>{
    return this.http.post('http://localhost:8000/api/login', dados);
  }

  getAllEvents(dados:any): Observable<any>{
    return this.http.get('http://localhost:8000/api/getAllEvents/'+dados);
  }

  deleteEvent(dados:any): Observable<any>{
    return this.http.delete('http://localhost:8000/api/deleteEvent/'+dados);
  }

  addNewEvent(dados:any): Observable<any>{
    return this.http.post('http://localhost:8000/api/newEvent', dados);
  }

  findEventById(dados:any): Observable<any>{
    return this.http.get('http://localhost:8000/api/getEventById/'+ dados);
  }

  alteraEvento(dados:any): Observable<any>{
    return this.http.put('http://localhost:8000/api/updateEvent', dados);
  }

  getAllUsers(dados:any): Observable<any>{
    return this.http.get('http://localhost:8000/api/getAllUser/'+ dados);
  }

  sendInvite(dados:any): Observable<any>{
    return this.http.post('http://localhost:8000/api/sendInvite', dados);
  }

  getInvites(dados:any): Observable<any>{
    return this.http.get('http://localhost:8000/api/getInvites/'+ dados);
  }

  rejectInvite(dados:any): Observable<any>{
    return this.http.put('http://localhost:8000/api/rejectInvite', dados);
  }

  acceptInvite(dados:any): Observable<any>{
    return this.http.put('http://localhost:8000/api/acceptInvite', dados);
  }

  aceptedEvents(dados:any): Observable<any>{
    return this.http.get('http://localhost:8000/api/aceptedEvents/'+ dados);
  }
}
