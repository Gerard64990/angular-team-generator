import { Injectable } from '@angular/core';
import { Match } from '../models/match-model';
import { Player, getPlayerLevel } from '../models/player-model';
import { Team } from '../models/team-model';

@Injectable({
  providedIn: 'root'
})
export class MatchListService {

  matchList : Match[] = [];

  constructor() { }

  getMatchList() : Match[] {
    return this.matchList;
  }

  generateMatchList(playerList: Player[], num_solutions: number) {
    if ( playerList.length < 8 )
      return;

    const lvlArray: number[] = [];
    var playersMapLvl = new Map<number, Player>();

    for ( let player of  playerList ) {
      const playerLvl : number = getPlayerLevel(player);
      lvlArray.push(playerLvl);
      playersMapLvl.set(playerLvl, player);
    }
    const isUnique : boolean = (Array.from(new Set(lvlArray)).length === lvlArray.length);
    if ( !isUnique )
      return;

    var solutions : number[][] = this.makeTeams(lvlArray, num_solutions);

    for ( var i = 0; i < num_solutions; i++) {
      var t1 : Team = new Team;
      var t2 : Team = new Team;
      for ( var playerlvl of solutions[i] ) {
        t1.add(playersMapLvl.get(playerlvl));
      }
      for (var lvl of lvlArray) {
        if ( solutions[i].indexOf(lvl) == -1 )
          t2.add(playersMapLvl.get(lvl));
      }
      this.matchList[i] = new Match(t1, t2);
    }
  }

  makeTeams(lvl: number[], num_solutions: number) : number[][] {
    const totalscore : number = lvl.reduce((sum, current) => sum + current, 0);
    const halftotalscore : number = totalscore / 2.;

    let oldmoves = new Map<number, number[]>();
    for (var p of lvl) {
      const people_left: number[] = Object.assign([], lvl);
      people_left.splice(people_left.indexOf(p), 1);
      oldmoves.set(p, people_left);
    }

    for ( let i = 2; i < lvl.length/2+1; i++ ) {
      let newmoves = new Map<number, number[]>();
      for (let [total, roster] of oldmoves) {
        for (let p of roster) {
          const people_left: number[] = Object.assign([], roster);
          people_left.splice(people_left.indexOf(p), 1);
          const newTotal : number = total+p;
          if ( newTotal > halftotalscore )
            continue;
          newmoves.set(newTotal, people_left);
        }
      }
      oldmoves = newmoves;
    }
    var solutions : number[][] = [];
    for ( var i = 0; i < num_solutions; i++) {
      var maxKey : number = -1;
      var maxKeyVal : number = Number.POSITIVE_INFINITY;
      oldmoves.forEach((value: number[], key: number) => {
        if ( Math.abs(key-halftotalscore) < maxKeyVal ) {
          maxKey = key;
          maxKeyVal = Math.abs(key-halftotalscore);
        }
      });
      var sol : number[] | undefined = oldmoves.get(maxKey);
      if ( sol != undefined ) {
        solutions.push(sol);
        oldmoves.delete(maxKey);
      }
    }
    return solutions;
  }

}
