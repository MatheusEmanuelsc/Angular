import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DragonballCharListComponent } from "../../components/dragonball-char-list/dragonball-char-list.component";
import type { Char } from '../../interface/Char';
import { CharAppComponent } from "../../components/char-app/char-app.component";


@Component({
  selector: 'app-dragonball',
  imports: [DragonballCharListComponent, CharAppComponent],
  templateUrl: './dragonball-super.component.html',
  styleUrl: './dragonball-super.component.css',
})
export class DragonballSuperComponent {
  name = signal('');
  power = signal(0);
  char = signal<Char[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },

  ]);


}
