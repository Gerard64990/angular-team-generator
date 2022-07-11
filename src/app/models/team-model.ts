import { Player, getPlayerLevel } from "./player-model";

export class Team {
  players: Player[];
  constructor(players? : Player[]) {
    this.players = players ?? [];
  }

  add(player : Player | undefined) {
    if (player != undefined)
      this.players.push(player);
  }

  getLevel() : number {
    return this.players.reduce((sum, current) => sum + getPlayerLevel(current), 0);
  }
  getAttLevel() : number {
    return this.players.reduce((sum, current) => sum + current.att, 0);
  }
  getDefLevel() : number {
    return this.players.reduce((sum, current) => sum + current.def, 0);
  }
  getSpiLevel() : number {
    return this.players.reduce((sum, current) => sum + current.spi, 0);
  }
  getStaLevel() : number {
    return this.players.reduce((sum, current) => sum + current.sta, 0);
  }
}