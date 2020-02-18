let pets = [
    {
        nome: "Thor"
    },
    {
        nome: "Romanoff"
    }
];

const listarPets = () => {
    let conteudo = "";
    for (let pet of pets) {
        conteudo += `
        -------------------
        ${pet.nome}
        -------------------`;
    }
    return conteudo;
};

const adicionarPet = (novoPet)=>{
    return pets.push(novoPet);
}

const buscarPet = nomePet =>{
    let petEncontrado = pets.filter(pet =>{
        return pet.nome == nomePet
    })
    return petEncontrado;
}

module.exports = {listarPets, adicionarPet, buscarPet};