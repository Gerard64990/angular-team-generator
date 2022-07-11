import { Team } from "./team-model";

export class Match {
  team1: Team;
  team2: Team;
  constructor(team1 : Team, team2 : Team) {
    this.team1 = team1;
    this.team2 = team2;
  }
  getTotalDiff() : number {
    return (this.team1.getLevel() - this.team2.getLevel());
  }
  getAttDiff() : number {
    return (this.team1.getAttLevel() - this.team2.getAttLevel());
  }
  getDefDiff() : number {
    return (this.team1.getDefLevel() - this.team2.getDefLevel());
  }
  getSpiDiff() : number {
    return (this.team1.getSpiLevel() - this.team2.getSpiLevel());
  }
  getStaDiff() : number {
    return (this.team1.getStaLevel() - this.team2.getStaLevel());
  }
}