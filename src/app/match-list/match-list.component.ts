import { Component, OnInit } from '@angular/core';
import { Match } from '../models/match-model';
import { Player } from '../models/player-model'
import { MatchListService } from '../services/match-list.service';
import { PlayerListService } from '../services/player-list.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})

export class MatchListComponent implements OnInit {

  selectedPlayerList : Player[] = [];
  matchList : Match[] = [];
  private  numMatch : number = 6;
  imgPath : string = "./assets/soccer-field_min.jpg";

  constructor(private playerListService: PlayerListService, private matchListService: MatchListService) { }

  ngOnInit(): void {
    this.getSelectedPlayerList();
    this.getMatchList();
    // this.generateMatchList();
  }

  getMatchList() {
    this.matchList = this.matchListService.getMatchList();
  }

  getSelectedPlayerList() {
    this.selectedPlayerList = this.playerListService.getSelectedPlayerList();
  }

  generateMatchList() {
    this.matchListService.generateMatchList(this.selectedPlayerList, this.numMatch);
    this.getMatchList();
  }

  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
