import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  listaNomes:string[]=["clein","zem","fein","lein","sein"];
  nomeRemovido?:string="";// ? para garantir que pode receber dados nulos under

  removeNome():void{
    this.nomeRemovido= this.listaNomes.pop();
  }


}
