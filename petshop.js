let pets = [
    {
        nome: "Thor",
        tipo: "cachorro",
        raca: "Pastor Alemão",
        idade: [5, "anos"],
        genero: "M",
        vacinado: true,
        servicos: ["Banho", "Tosa"]
    },
    {
        nome: "Thanos",
        tipo: "cachorro",
        raca: "Pitbull",
        idade: [10, "anos"],
        genero: "M",
        vacinado: true,
        servicos: ["Banho", "Tosa"]
    },
    {
        nome: "Gamora",
        tipo: "cachorro",
        raca: "labrador",
        idade: [2, "meses"],
        genero: "F",
        vacinado: false,
        servicos: ["tosa"]
    },
    {
        nome: "Romanoff",
        tipo: "cachorro",
        raca: "vira lata",
        idade: [2, "anos"],
        genero: "F",
        vacinado: false,
        servicos: []
    }
];

const listarPets = () => {
    let conteudo = "";
    for (let pet of pets) {
        conteudo += `
        Nome do Animal: ${pet.nome}
        Descrição: ${pet.tipo}
        Raça: ${pet.raca}            
        Idade: ${pet.idade}
        ${pet.genero === "M" ? "Genero: Macho" : "Genero: Femea"}
        ${pet.vacinado == true ? "Está vacinado" : "Não está vacinado"}
        Serviços realizados: ${pet.servicos}
        ____________________________________
        `
    }
    return conteudo;
};

const validarDados = novoPet => {

    return (
        novoPet.nome &&
        novoPet.tipo &&
        novoPet.raca &&
        novoPet.idade &&
        novoPet.genero);
};

const adicionarPet = novoPet => {

    if (typeof (novoPet) == "object" && validarDados(novoPet)) {

        novoPet.nome = String(novoPet.nome);
        novoPet.idade = parseInt(novoPet.idade);

        if (!novoPet.servicos) {
            novoPet.servicos = [];
        }
        return pets.push(novoPet);
    } else {
        return false
    }
};

const buscarPet = nomePet => {
    let petEncontrado = pets.filter(pet => {
        return pet.nome == nomePet
    })
    return petEncontrado;
}

const vacinarPet = nomePet => {
    for (pet of pets) {
        if (pet.nome === nomePet) {
            if (!pet.vacinado) {
                pet.vacinado = true;
                return true
            }
        }
    }
    return false
};

const banho = pet => {
    pet.servicos.push("banho");
};

const tosa = pet => {
    pet.servicos.push("tosa");
};

const unha = pet => {
    pet.servicos.push("corte de unha");
}

const atenderPet = (nomePet, servico) => {

    for (let pet of pets) {
        if (pet.nome === nomePet) {
            switch (servico) {
                case "banho":
                    banho(pet)
                    break;
                case "tosar":
                    tosar(pet)
                    break;
                case "unha":
                    unha(pet)
                    break;
                default:
                    return `Serviço de ${servico} inesistente, verficar nome do serviço!`
            }
            return `${pet.nome} realizou o serviço: ${servico}`
        }
    }

};

const contarVacinados = () => {

    let vacinados = pets.filter(pet => pet.vacinado).length;
    let naoVacinados = pets.filter(pet => !pet.vacinado).length;

    return (`
    Temos ${vacinados} pets vacinados.
    Temos ${naoVacinados} pets não vacinados.`);
};

const campanhaDeVacinacao = () => {

    let contador = 0;
    let arrayForamVacinados = [];

    while (contador < pets.length) {
        if (!pets[contador].vacinado) {
            vacinarPet(pets[contador].nome);
            arrayForamVacinados.push(pets[contador].nome);
        }
        contador++;
    }
    return (`Total de pets vacinados: ${arrayForamVacinados.length}`);
};

module.exports = { listarPets, adicionarPet, buscarPet, vacinarPet, atenderPet, contarVacinados, campanhaDeVacinacao };