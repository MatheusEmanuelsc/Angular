const nom: string[] = ['tai','sai','jao']; //Array

interface carro{
    marca:string,
    ano:number,
    cor:string,
    codigo?:string // ? deixa opicional

}

//implementando a interface
const carro1:carro ={
    marca: "seilar",
    ano: 2016,
    cor: "azul"
};

// objeto literal
const pessoa={

    nome:"jao",
    idade:22,
    lazer:["ler","esportes"]
};
console.log(nom);
console.table(carro1);
console.table(pessoa);
export{};