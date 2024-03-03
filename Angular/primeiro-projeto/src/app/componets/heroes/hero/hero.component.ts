import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public nome:string="Jao";
  public idade:number=17;

  get capitalizeName(){
    return this.nome.toUpperCase();
  }

  getHeroDesc():string{
    return`${this.nome} - ${this.idade}`;
  }

  mudaNome():void{
    this.nome="Bao";
  }

  mudaIdade():void{
    this.idade=22;
  }


}
