import { ɵpublishDefaultGlobalUtils } from "@angular/core";
import { DartGameOptions, DartGameRules } from "src/app/models";

export const DefaultGameOptions: DartGameOptions[] = [
  {
    name: "301",
    throwsPerTurn: 3,
    roundsPerGame: 0,
    startingScore: 301,
    targetScore: 0,
    inRules: [DartGameRules.InOutRule.Double],
    outRules: [DartGameRules.InOutRule.Double],
    scoreRule: DartGameRules.ScoreRule.Subtract,
    winRule: DartGameRules.WinRule.TargetScore,
  },
  {
    name: "501",
    throwsPerTurn: 3,
    roundsPerGame: 0,
    startingScore: 501,
    targetScore: 0,
    inRules: [DartGameRules.InOutRule.Double],
    outRules: [DartGameRules.InOutRule.Double],
    scoreRule: DartGameRules.ScoreRule.Subtract,
    winRule: DartGameRules.WinRule.TargetScore,
  },
  {
    name: "Baseball",
    throwsPerTurn: 9,
    roundsPerGame: 9,
    startingScore: 0,
    targetScore: 0,
    inRules: [],
    outRules: [],
    scoreRule: DartGameRules.ScoreRule.Baseball,
    winRule: DartGameRules.WinRule.HighScore,
  },
  {
    name: "Cricket",
    throwsPerTurn: 3,
    roundsPerGame: 0,
    startingScore: 0,
    targetScore: 0,
    inRules: [],
    outRules: [],
    scoreRule: DartGameRules.ScoreRule.Cricket,
    winRule: DartGameRules.WinRule.Cricket,
  },
];
