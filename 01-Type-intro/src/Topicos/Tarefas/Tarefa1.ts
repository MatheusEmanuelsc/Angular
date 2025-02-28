
interface SuperHero{
    name:string;
    age:30;
    address:address;
    showAddress: ()=>string;
}
interface address {
    calle: string;
    pais: string;
    ciudad: string;
}

const superHero: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        calle: 'Main St',
        pais: 'USA',
        ciudad: 'NY'
    },
    showAddress() {
        return this.name + ', ' + this.address.ciudad + ', ' + this.address.pais;
    }
}




const address = superHero.showAddress();
console.log( address );




export {};