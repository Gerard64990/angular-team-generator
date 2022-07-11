import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../models/player-model';
import { PlayerListService } from '../services/player-list.service';

@Component({
  selector: 'app-players',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})

export class PlayerListComponent implements OnInit, OnDestroy {

  playerList : Player[] = [];
  playerListSubscription!: Subscription;

  constructor(private playerListService: PlayerListService) {
  }

  ngOnDestroy(): void {
    this.playerListSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.playerListSubscription = this.playerListService.playerSubject.subscribe(
      (playerList: Player[]) => {
        this.playerList = playerList;
      }
    );
    this.playerListService.emitPlayerSubject();
  }

  onClick(id:number, checked:boolean) {
    if (checked)
      this.playerListService.addPlayerToSelectedList(id);
    else
      this.playerListService.removePlayerToSelectedList(id);
  }

}



