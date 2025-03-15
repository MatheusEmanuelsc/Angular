import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DragonballCharListComponent } from "../../components/dragonball-char-list/dragonball-char-list.component";

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
  name = signal('');
  power = signal(0);
  char = signal<Char[]>([
    { id: 1, name: 'Goku', power: 9000 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 3, name: 'Piccolo', power: 3000 },
    // { id: 3, name: 'Yamcha', power: 500 },
  ]);

  addChar(){
      if (!this.name() || !this.power() || this.power()<= 0) {
        return;
      }
      const newChar:Char ={
        id:this.char().length+1,
        name:this.name(),
        power:this.power()
      }

      this.char().push(newChar);
  }
}
