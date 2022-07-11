import CoeffJson from '../../assets/coeff.json';

export class Player {
  id: number;
  firstName: string;
  lastName: string;
  att: number;
  def: number;
  sta: number;
  spi: number;

  constructor(id?: number, firstName?: string, lastName?: string, att?: number, def?: number, sta?: number, spi?: number) {
    this.id = id ?? -1;
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.att = att ?? -1;
    this.def = def ?? -1;
    this.sta = sta ?? -1;
    this.spi = spi ?? -1;
  }


}

export function getPlayerLevel(player: Player) : number {
  return (player.att * CoeffJson.att + player.def * CoeffJson.def + player.sta * CoeffJson.sta + player.spi * CoeffJson.spi);
}

export const COLUMNS_SCHEMA = [
  {
      key: "id",
      type: "number",
      label: "id"
  },
  {
      key: "firstName",
      type: "text",
      label: "FirstName"
  },
  {
      key: "lastName",
      type: "text",
      label: "LastName"
  },
  {
      key: "att",
      type: "number",
      label: "Att"
  },
  {
      key: "def",
      type: "number",
      label: "Def"
  },
  {
      key: "sta",
      type: "number",
      label: "Spa"
  },
  {
      key: "spi",
      type: "number",
      label: "Spi"
  },
  {
      key: "isEdit",
      type: "isEdit",
      label: ""
  }
]
