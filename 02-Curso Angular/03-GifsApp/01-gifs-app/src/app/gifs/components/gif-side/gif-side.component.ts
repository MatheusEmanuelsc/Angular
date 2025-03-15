import { Component } from '@angular/core';
import { GifsSideMenuOptionsComponent } from "../gifs-side-menu-options/gifs-side-menu-options.component";
import { GifsSideMenuComponent } from "../gifs-side-menu/gifs-side-menu.component";

@Component({
  selector: 'app-gif-side',
  imports: [GifsSideMenuOptionsComponent, GifsSideMenuComponent],
  templateUrl: './gif-side.component.html',
  styleUrl: './gif-side.component.css'
})
export class GifSideComponent {

}
