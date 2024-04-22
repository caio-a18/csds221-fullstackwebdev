import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { CountryService } from '../services/country.service';
import { Game } from './game';
import { Question } from './question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
// Export
export class GameComponent implements OnInit {
  private countries: Country[] = [];
  countriesLoaded = false;
  gameReady = false;
  game: Game;
  gameMessage: string;
  mode: string;
  showDevNotes: boolean;
  showIntro = true;
  showInfo = false;

  constructor(
    private http: HttpClient,
    private countryService: CountryService
  ) {}

  // lifecycle hook
  ngOnInit() {
    this.countryService.countries$.subscribe((data) => {
      this.countries = data;
      this.countriesLoaded = true;
    });
  }

  // toggles info button on and off
  toggleInfo() {
    this.showInfo = !this.showInfo; // This will show or hide the info box when the button is clicked
  }

  // Sets the game to be ready
  setGameReady(isGameReady: boolean) {
    this.gameReady = isGameReady;
    this.showIntro = false;
    if (this.gameReady) {
      this.clearOutPreviousGame();
      this.initGame();
    }
  }

  // Checks if the country selected was correct
  // +10 points if the chosen country was correct
  // +0 points if the chosen country was incorrect
  choiceMade(choice: boolean) {
    this.mode = 'chose';
    if (choice) {
      this.gameMessage = 'Correct!';
      this.game.score += 5;
    } else {
      this.gameMessage = `Incorrect. The correct country was  ${
        this.countries[this.game.questions[this.game.turn].correctAnswer].name
      }`;
    }
  }

  // function for next question in line
  next() {
    this.game.turn += 1;
    if (this.game.turn === 20) {
      this.mode = 'over';
    } else {
      this.mode = 'start';
    }
    this.gameMessage = '';
  }

  initGame() {
    // Create questions
    for (let i = 0; i < 20; i++) {
      const indices: number[] = this.getThreeIndices();
      const flagImageSrc = this.getFlagImageSource(indices[0]);
      const question: Question = {
        correctAnswer: indices[0],
        allChoices: this.randomizeThisArray(indices),
        flagImageSrc: flagImageSrc,
      };
      this.game.questions.push(question);
    }
  }

  clearOutPreviousGame() {
    this.mode = 'start';
    this.game = { questions: [], turn: 0, score: 0 };
    this.showIntro = true; // Show intro when game is reset
  }

  getThreeIndices(): number[] {
    // Using a Set() to ensure that the choices are unique
    const indexes = new Set<number>();
    while (indexes.size < 5) {
      const randomIndex = Math.floor(Math.random() * this.countries.length);
      indexes.add(randomIndex);
    }
    return Array.from(indexes);
  }

  getFlagImageSource(index: number): string {
    return `https://flagsapi.com/${this.countries[index].code}/flat/64.png`;
  }

  // Fisher-Yates true randomizer function (overkill for this use case)
  randomizeThisArray(arr: number[]) {
    const shuffledNumbers = [];

    while (arr.length > 0) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const randomNum = arr.splice(randomIndex, 1)[0];
      shuffledNumbers.push(randomNum);
    }

    return shuffledNumbers;
  }

  viewDevNotes() {
    this.showDevNotes = true;
  }
}
