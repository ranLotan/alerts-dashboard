import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private basicUrl: string = 'http://localhost:3000'
  constructor(private client: HttpClient) { }

  public getAlerts(): Observable<string> {
    return this.client.get(this.basicUrl,{ responseType : "text" });
  }

}
