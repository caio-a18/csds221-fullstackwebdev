import { Question } from './question';

export interface Game {
  questions: Question[];
  turn: number;
  score: number;
}
