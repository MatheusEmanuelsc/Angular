
interface AudioPlayer{

    audioVolume:number;
    songDuration:number;
    song:string;
    details:Details;
}

interface Details{
    author:string;
    year:number;
}

const audioPlayer:AudioPlayer = {
    audioVolume: 120,
    songDuration: 70,
    song: "mess",
    details: {
        author: "seilar",
        year: 2017
    }
}

// destruturação
const {song} =audioPlayer;
// const {song:anotherSong} =audioPlayer;// caso queria trocar o nome da variavel que sera gerada

const{details} =audioPlayer;
const{author} =details;
//exemplo para 2 objetos

console.log(author);


console.log(song);
export{};