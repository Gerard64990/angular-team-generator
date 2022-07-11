import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { COLUMNS_SCHEMA, Player } from '../models/player-model';
import { PlayerListService } from '../services/player-list.service';

@Component({
  selector: 'app-player-list-edit',
  templateUrl: './player-list-edit.component.html',
  styleUrls: ['./player-list-edit.component.css']
})

export class PlayerListEditComponent implements AfterViewInit, OnInit, OnDestroy {

  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  columnsSchema: any = COLUMNS_SCHEMA;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);

  private playerList: any[] = []
  playerListSubscription!: Subscription;

  constructor(private playerListService: PlayerListService, private router: Router) { }

  ngOnDestroy(): void {
    this.playerListSubscription.unsubscribe();
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.playerListSubscription = this.playerListService.playerSubject.subscribe(
      (playerList: Player[]) => {
        this.playerList = playerList;
      }
    );
    this.playerListService.emitPlayerSubject();
    
    this.dataSource =  new MatTableDataSource(this.playerList);
  }

  onSave() {
    this.playerListService.savePlayerToServer();
    this.router.navigate(['']);
  }

}
