export function qualOTipo<T>( t:T ):T{
    return t
}//exemplo generico

const eString = qualOTipo("seilar");
const eNumber = qualOTipo(1);

console.log(eString);
console.log(eNumber);