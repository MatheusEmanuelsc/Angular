import { Component, input } from '@angular/core';
import type { Char } from '../../interface/Char';


@Component({
  selector: 'app-dragonball-char-list',
  imports: [],
  templateUrl: './dragonball-char-list.component.html',
  styleUrl: './dragonball-char-list.component.css',
})
export class DragonballCharListComponent {
  char = input.required<Char[]>();
  listName=input.required<string>();
}
