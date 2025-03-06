import { Component } from '@angular/core';
import { GifsSideMenuLogoComponent } from "../gifs-side-menu-logo/gifs-side-menu-logo.component";
import { GifsSideMenuProfileComponent } from "../gifs-side-menu-profile/gifs-side-menu-profile.component";

@Component({
  selector: 'app-gifs-side-menu',
  imports: [GifsSideMenuLogoComponent, GifsSideMenuProfileComponent],
  templateUrl: './gifs-side-menu.component.html',
  styleUrl: './gifs-side-menu.component.css'
})
export class GifsSideMenuComponent {

}
