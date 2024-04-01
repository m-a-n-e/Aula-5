const url = "https://akabab.github.io/superhero-api/api/all.json";
const display = document.querySelector("#display-data");
const displayFirstAppearance = document.querySelector("#display_first_appearance");
const displayDC = document.querySelector("#display_dc");
const displaySuperhero = document.querySelector("#display_superhero");

document.addEventListener("DOMContentLoaded", function() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // Verificar se os dados estão corretamente estruturados
            if (!Array.isArray(data)) {
                console.error("Os dados não estão no formato esperado.");
                return;
            }

            // Limpar qualquer conteúdo existente
            display.innerHTML = "";

            // Usando map para criar uma lista com o alter_ego de todos os personagens
            const alterEgoList = document.createElement('ul');
            data.forEach(character => {
                if (character.biography && character.biography.alterEgos) {
                    if (Array.isArray(character.biography.alterEgos)) {
                        character.biography.alterEgos.forEach(alterEgo => {
                            if (alterEgo !== "No alter egos found.") {
                                const li = document.createElement('li');
                                li.textContent = alterEgo;
                                alterEgoList.appendChild(li);
                            }
                        });
                    } else if (character.biography.alterEgos !== "No alter egos found.") {
                        const li = document.createElement('li');
                        li.textContent = character.biography.alterEgos;
                        alterEgoList.appendChild(li);
                    }
                }
            });
            display.appendChild(alterEgoList);

            // Filtrando personagens da Marvel Comics
            const marvelCharacters = data.filter(character => {
                return character.biography && character.biography.publisher && character.biography.publisher.toLowerCase().includes("marvel");
            });

            // Usando reduce para calcular o tamanho total dos caracteres de todos os "firstAppearance"
            const totalFirstAppearanceLength = marvelCharacters.reduce((total, character) => {
                if (character.biography && character.biography.firstAppearance) {
                    return total + character.biography.firstAppearance.length;
                }
                return total;
            }, 0);

            console.log("Tamanho total dos caracteres de todos os 'firstAppearance' para personagens da Marvel:", totalFirstAppearanceLength);

            // Criando o conteúdo para a div
            const marvelContent = `Tamanho total dos caracteres de todos os 'firstAppearance' para personagens da Marvel: ${totalFirstAppearanceLength}`;
            displayFirstAppearance.innerHTML = marvelContent;

            // Filtrando personagens da DC Comics
            const dcCharacters = data.filter(character => {
                return character.biography && character.biography.publisher && character.biography.publisher.toLowerCase().includes("dc");
            });

            // Criando lista de personagens da DC Comics
            const dcList = document.createElement('ul');
            dcCharacters.forEach(character => {
                const li = document.createElement('li');
                li.textContent = character.name;
                dcList.appendChild(li);
            });

            // Adicionando lista de personagens da DC Comics à div
            displayDC.appendChild(dcList);

            // Ordenar o vetor pelo tamanho do nome dos personagens
            data.sort((a, b) => {
                return a.name.length - b.name.length;
            });

            // Criando lista de personagens ordenada pelo tamanho do nome
            const superheroList = document.createElement('ul');
            data.forEach(character => {
                const li = document.createElement('li');
                li.textContent = character.name;
                superheroList.appendChild(li);
            });

            // Adicionando lista de personagens ordenada à div
            displaySuperhero.appendChild(superheroList);

            console.log("Vetor organizado pelo tamanho do nome dos personagens:", data);
        })
        .catch((error) => console.error("Erro ao buscar os dados:", error));
});
