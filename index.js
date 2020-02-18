const http = require('http');
const url = require('url');

const petshop = require('./petshop');


const server = http.createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8" });

    let urlCompleta = url.parse(req.url, true);
    let queryString = urlCompleta.query;
    let rota = urlCompleta.pathname;


    switch (rota) {
        case "/":
            res.write("**Bem vindo ao PetShop**");
            break;
        case "/pets":
            const pets = petshop.listarPets();
            if (pets.length > 0) {
                res.write(pets)
            } else {
                res.write("Nenhum pet cadastrados")
            }
            break;
        case "/pets/add":
            let novoPet = queryString;
            if (petshop.adicionarPet(novoPet)) {
                res.write(`${novoPet.nome} foi cadastrado com sucesso!`);
            } else {
                res.write(`Ops, algo deu errado!`);
            }
            
            break;
        case "/pets/buscar":

            let petEncontrado = petshop.buscarPet(queryString.nome);
            if(petEncontrado.length > 0){
                res.write(`${petEncontrado.length} pets  foram encontrado`);
            }else{
                res.write("Ops, pet não encontrado");
            }
           
            break
        default:
            res.write("Pets Dh");
    }


    res.end();


}).listen(3000, "localhost", () => {
    console.log("servidor foi iniciado!");
});

