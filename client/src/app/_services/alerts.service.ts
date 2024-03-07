import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAlerts } from '../_interfaces/alerts';



@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private basicUrl: string = 'http://localhost:3000'
  private userData: string = 'userAlertsData';
  constructor(private client: HttpClient) { }

  public getAlerts(): Observable<IAlerts> {
    return this.client.get<IAlerts>(this.basicUrl);
  }

  public getUserData(): IAlerts[] | null {
    const jsonString = localStorage.getItem(this.userData);
    if(jsonString){
      return JSON.parse(jsonString);
    }
    return null;
  }

  public setUserData(alerts: IAlerts[]){
    const jsonString = JSON.stringify(alerts);
    localStorage.setItem(this.userData, jsonString);
  }

}
