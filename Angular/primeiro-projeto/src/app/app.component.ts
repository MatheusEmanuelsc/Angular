import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from "./componets/counter/counter.component";
import { HeroComponent } from "./componets/heroes/hero/hero.component";
import { ListComponent } from "./componets/heroes/list/list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, CounterComponent, HeroComponent, ListComponent]
})
export class AppComponent {

  public title:string = 'Ola Mundo!!!';
}
