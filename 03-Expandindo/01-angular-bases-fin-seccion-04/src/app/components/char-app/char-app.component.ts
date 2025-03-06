import { Component, input, signal } from '@angular/core';
import { Char } from '../../interface/Char';

@Component({
  selector: 'app-char-app',
  imports: [],
  templateUrl: './char-app.component.html',
  styleUrl: './char-app.component.css',
})
export class CharAppComponent {
  name = signal('');

  power = signal(0);
  char = input.required<Char[]>();
  addChar() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }
    const newChar: Char = {
      id: this.char().length + 1,
      name: this.name(),
      power: this.power(),
    };

    this.char().push(newChar);
  }
}
