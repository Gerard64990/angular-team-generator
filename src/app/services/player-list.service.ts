import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Player } from '../models/player-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {

  playerSubject = new Subject<Player[]>();

  private playerList : Player[] = [];
  private selectedPlayerList : Player[] = [];

  constructor(private httpClient: HttpClient) {
    this.getPlayerFromServer();
  }

  emitPlayerSubject() {
    this.playerSubject.next(this.playerList);
  }

  getSelectedPlayerList() : Player[] {
    return this.selectedPlayerList;
  }

  addPlayerToSelectedList( playerId: number ) {
    this.selectedPlayerList.push(this.playerList[playerId]);
  }

  removePlayerToSelectedList( playerId: number ) {
    const indexOfObject = this.selectedPlayerList.findIndex((object) => {
      return object.id === playerId;
    });
    if (indexOfObject !== -1) {
      this.selectedPlayerList.splice(indexOfObject, 1);
    }
  }

  savePlayerToServer() {
    this.httpClient
      .put('https://teamgenerator-ef7f2-default-rtdb.europe-west1.firebasedatabase.app/players.json', this.playerList )
      .subscribe({
        next: (val) => {
          this.emitPlayerSubject();
        },
        error: (err) => { console.log('Error save' + err); }
      });
  }

  getPlayerFromServer() {
    this.httpClient
    .get<Player[]>('https://teamgenerator-ef7f2-default-rtdb.europe-west1.firebasedatabase.app/players.json')
    .subscribe({
      next: (response) => {
        this.playerList = response;
        this.emitPlayerSubject();
      },
      error: (err) => { console.log('Error get'+err) }
    });
  }
}
