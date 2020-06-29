import { DartGameRules } from './dart-game-rules.enum';

export class DartGameOptions {
    name = "301";
    throwsPerTurn = 3;
    roundsPerGame = -1;

    startingScore: number;
    targetScore: number;
  
    inRules: DartGameRules.InOutRule[];
    outRules: DartGameRules.InOutRule[];
    scoreRule: DartGameRules.ScoreRule;
    winRule: DartGameRules.WinRule;
}

