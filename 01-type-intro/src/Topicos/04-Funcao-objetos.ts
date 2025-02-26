interface carro{
    marca:string;
    ano:number;
    placa:string;

    fazVrum:()=> void;
}

const carro1:carro={
    marca: "jetta",
    ano: 2007,
    placa: "12345",
    fazVrum: function (): void {
        console.log("vrummmmm");
    }
}

function carroDono(carroX:carro):void {
    
    console.log("Ligandooo")
    carroX.fazVrum()
}

carroDono(carro1);
export{};