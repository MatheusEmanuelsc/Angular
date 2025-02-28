import { Component } from '@angular/core';

@Component({
  selector: 'app-couter',
  imports: [],
  templateUrl: './couter.component.html',
  styleUrl: './couter.component.css',
})
export class CouterComponent {
  counter = 10;

  Plus(value: number) {
    this.counter += value;
  }
  Minus(value: number) {
    this.counter -= value;
  }

  Reset(value:number) {
    this.counter = value;
  }
}
