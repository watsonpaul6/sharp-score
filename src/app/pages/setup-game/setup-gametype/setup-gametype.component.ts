import { Component, OnInit, Inject, Input, Output, EventEmitter } from "@angular/core";
import { DartGameOptions, DartGameRules } from "src/app/models";
import { DefaultGameOptions } from "src/app/models/default-gameoptions.factory";

@Component({
  selector: "app-setup-gametype",
  templateUrl: "./setup-gametype.component.html",
  styleUrls: ["./setup-gametype.component.scss"],
})
export class SetupGametypeComponent implements OnInit {
  @Input() quickStart: boolean;
  @Input() gameOptions: DartGameOptions;
  @Output() gameOptionsChange = new EventEmitter<DartGameOptions>();

  public readonly inOutRules = Object.keys(DartGameRules.InOutRule)
  public readonly scoreRules = Object.keys(DartGameRules.ScoreRule)
  public readonly winRules = Object.keys(DartGameRules.WinRule)

  public get optionsName() {
    return this.gameOptions.name;
  }
  public set optionsName(value) {
    this.gameOptions = DefaultGameOptions.find((v) => v.name === value);
    this.gameOptionsChange.emit(this.gameOptions);
  }

  // public get inRules() {
  //   return this.gameOptions.inRules;
  // }
  // public set inRules(value) {
  //   this.gameOptions.inRules = value;
  // }


  public readonly selectOptions = {
    // header: 'Gametype Name',
    // subHeader: 'Select gametype to play',
    // message: 'Select gametype to play'
  };
  public get gameOptionNames() {
    return DefaultGameOptions.map((v) => v.name);
  }
  ngOnInit() {}
}
