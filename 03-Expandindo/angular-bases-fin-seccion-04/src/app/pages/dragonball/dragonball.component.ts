import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Char{
  id:number;
  name:string;
  power:number;
}

@Component({
  selector: 'app-dragonball',
  imports: [],
  templateUrl: './dragonball.component.html',
  styleUrl: './dragonball.component.css',
})
export class DragonballComponent {
  name = signal('gohan');
  power = signal(4500);
  char = signal<Char[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8000 },
    { id: 3, name: 'Piccolo', power: 3000 },
    { id: 3, name: 'Yamcha', power: 500 },
  ]);
}
