
// Tipos
let nome:string ="jao";//aceita apenas tipo string
let idade:number=30;//aceita apenas tipo numero
let isAlive:boolean =true;//tipo boolean


let talvez: string | number ="pode ser";//aceita string ou number
let seilar:any="tanto faz"//recebe qual quer valor

const valorConstante:string= "20";//Constante ou seja ela não podera trocar o valor

console.log({
    nome,idade,isAlive,talvez,seilar,valorConstante
});
export{};