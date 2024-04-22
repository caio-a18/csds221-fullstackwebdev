import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountryService } from './services/country.service';
import { GameComponent } from './game/game.component';
import { AnswerComponent } from './answer/answer.component';
import { ClickStopPropagation } from './click-stop-propagation.directive';
import { AssetCheckComponent } from './asset-check/asset-check.component';
import { AssetViewComponent } from './asset-view/asset-view.component';
import { HideShowDirective } from './asset-view/hide-show.directive';

@NgModule({
  providers: [CountryService],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    GameComponent,
    AnswerComponent,
    ClickStopPropagation,
    AssetCheckComponent,
    AssetViewComponent,
    HideShowDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
