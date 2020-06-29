import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";


@Component({
  selector: "app-setup-players",
  templateUrl: "./setup-players.component.html",
  styleUrls: ["./setup-players.component.scss"],
})
export class SetupPlayersComponent implements OnInit {
  @Input() players: string[] = [];
  @Output() playersChange = new EventEmitter<string[]>();
  playerName: string = "";

  ngOnInit() {}

  onAddPlayer() {
    if (this.playerName !== "" && !this.players.includes(this.playerName)) {
      this.players.push(this.playerName);
    }
  }

  onRemovePlayer(idxToRemove: number) {
    this.players = this.players.filter((val, idx) => {
      return idx !== idxToRemove;
    });
    this.playersChange.emit(this.players);

  }

  async onReorder(ev) {
    this.players = await ev.detail.complete(this.players);
    this.playersChange.emit(this.players);
  }
}
