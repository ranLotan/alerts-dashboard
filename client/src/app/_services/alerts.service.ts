import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAlerts } from '../_interfaces/alerts';



@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private basicUrl: string = 'http://localhost:3000'
  constructor(private client: HttpClient) { }

  public getAlerts(): Observable<IAlerts> {
    return this.client.get<IAlerts>(this.basicUrl);
  }

}
