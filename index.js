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
            (pets.length > 0) ?
                res.write(pets) :
                res.write("Nenhum pet cadastrados")
            break;

        case "/pets/add":
            let novoPet = queryString;
            (petshop.adicionarPet(novoPet)) ?
                res.write(`${novoPet.nome} foi cadastrado com sucesso!`) :
                res.write(`
                Algo deu errado, verifique os dados e tente novamente!
                Dados necessários: nome | tipo | raça | idade | genero`);
            break;

        case "/pets/buscar":
            let petEncontadoBuscar = petshop.buscarPet(queryString.nome);
            (petEncontadoBuscar.length > 0) ?
                res.write(`${petEncontadoBuscar.length} pet foi encontrado`) :
                res.write(`Ops, pet não encontrado`);
            break

        case "/pets/vacinar":

            let petEncontradoVacinar = petshop.buscarPet(queryString.nome);
            let nomePet = queryString.nome

            if (petEncontradoVacinar.length > 0) {
                (petshop.vacinarPet(nomePet)) ?
                    res.write(`${nomePet} foi vacinado com sucesso `) :
                    res.write(`${nomePet} já está vacinado`);
            } else {
                res.write("Ops, pet não encontrado");
            }
            break;

        case "/pets/servico":
            let petEncontradoServico = petshop.buscarPet(queryString.nome);
            let nomePetServico = queryString.nome;
            let servico = queryString.servico;

            if (petEncontradoServico.length > 0) {
                let servicoRealizado = petshop.atenderPet(nomePetServico, servico)
                res.write(servicoRealizado);
            } else {
                res.write("Ops, pet não encontrado");
            }
            break;

        case "/pets/contarVacinados":
            let listaVacinados = petshop.contarVacinados();
            res.write(listaVacinados);
            break;

        case "/pets/campanha":
            let foramVacinados = petshop.campanhaDeVacinacao();
            res.write(foramVacinados);
            break;

        default:
            res.write("Pets Dh");
    }

    res.end();

}).listen(3000, "localhost", () => {
    console.log("servidor foi iniciado!");
});

