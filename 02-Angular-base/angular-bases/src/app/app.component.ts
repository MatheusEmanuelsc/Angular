import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CouterComponent } from "./pages/couter/couter.component";
import { HeroComponent } from "./pages/hero/hero.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CouterComponent, HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-bases';
}
