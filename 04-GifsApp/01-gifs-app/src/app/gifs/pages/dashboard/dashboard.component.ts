import { Component } from '@angular/core';
import { GifsSideMenuComponent } from "../../components/gifs-side-menu/gifs-side-menu.component";
import { GifsSideMenuOptionsComponent } from "../../components/gifs-side-menu-options/gifs-side-menu-options.component";
import { GifSideComponent } from "../../components/gif-side/gif-side.component";

@Component({
  selector: 'app-dashboard',
  imports: [GifSideComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
