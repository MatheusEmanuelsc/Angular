export class Pessoa{

    public name?:string;
    public address?:string;  
    // ? caso não importe do valor ser vazio

    constructor(name:string,address:string){
        this.name =name;
        this.address=address;

        // a forma curta  vc pode passar direto as propriedades  direto no construtor em forma de parametros que ele ja criar automaticamente
    }
}//classe basica Type


const pes1 = new Pessoa('jao',"12334");

console.log(pes1);

class Funcionario extends Pessoa{


    constructor(
        public id:number,
        name:string,
        address:string
    ){
        super(name,address)
    }

}




