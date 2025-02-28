export interface Produto{
    desc:string;
    price:number;
}//importando para arquivo 08

const cel:Produto={
    desc: "One",
    price: 200
}

const tablet:Produto={
    desc: "tab",
    price: 350
}

const carrinho=[cel,tablet];
const taxa = .10;

interface CalculadoraTaxa{
    taxa:number;
    produto:Produto[];
}
function tax(opc:CalculadoraTaxa):number[] {
    
    let total =0;

    opc.produto.forEach(prod =>{
        total+=prod.price;
    });

    return [total, total*opc.taxa];
}

const result= tax({
    produto:carrinho,
    taxa,
})

console.log("total",result[0]);
