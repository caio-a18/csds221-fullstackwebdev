import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Question } from '../game/question';
import { Country } from '../game/country';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
// Exports the AnswerComponent
export class AnswerComponent implements OnInit {
  @Input() question: Question;
  @Input() mode: string;
  @Output() makeChoice: EventEmitter<boolean> = new EventEmitter<boolean>();

  private countries: Country[];

  // instantiates constructor
  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.countries$.subscribe((data: Country[]) => {
      this.countries = data;
    });
  }

  // Gets the index of the country from the countries array
  getCountryNameFromIndex(index: number): string {
    return this.countries[index].name;
  }

  // Checks if the answer is correct
  choose(choice: number) {
    if (choice === this.question.correctAnswer) {
      this.makeChoice.emit(true);
    } else {
      this.makeChoice.emit(false);
    }
  }
}
