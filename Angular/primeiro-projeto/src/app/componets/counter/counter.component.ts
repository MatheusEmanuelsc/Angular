import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  
  public counter:number =5;

  // metodos
  aumentaValor(value:number):void{
    this.counter+=value;
  }
  diminuiValor():void{
    this.counter--;
  }
  resetaValor(){
    this.counter=5;
  }
}
