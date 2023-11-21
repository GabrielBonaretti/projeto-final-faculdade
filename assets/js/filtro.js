// Seleciona os elementos correspondentes aos consoles Nintendo
var nintendo = document.querySelectorAll(".nitendo");
var checkNintendo = document.getElementById("checkBoxNintendo");

// Seleciona os elementos correspondentes aos consoles Sega
var sega = document.querySelectorAll(".sega");
var checkSega = document.getElementById("checkBoxSega");

// Seleciona os elementos correspondentes aos consoles Tectoy
var tectoy = document.querySelectorAll(".tectoy");
var checkBoxTectoy = document.getElementById("checkBoxTectoy");

// Seleciona os elementos correspondentes aos consoles SNK
var snk = document.querySelectorAll(".snk");
var checkBoxSnk = document.getElementById("checkBoxSnk");

// Seleciona os elementos correspondentes aos consoles Philips
var philips = document.querySelectorAll(".philips");
var checkBoxPhilips = document.getElementById("checkBoxPhilips");

// Seleciona os elementos correspondentes aos consoles Atari
var atari = document.querySelectorAll(".atari");
var checkBoxAtari = document.getElementById("checkBoxAtari");

// Adiciona um manipulador de evento de alteração para cada checkbox
const checkboxes = document.querySelectorAll("input");
checkboxes.forEach(checkbox => checkbox.addEventListener("change", checked));

function checked(event) {
    let count = 6; // Inicializa o contador com o número total de checkboxes

    // Percorre cada checkbox e verifica se está marcado
    for (let value of checkboxes) {
        if (value.checked) {
            continue; // Se estiver marcado, passa para o próximo checkbox
        } else {
            count -= 1; // Se não estiver marcado, decrementa o contador
        };
    }

    // Exibe todos os consoles se todos os checkboxes estiverem marcados
    if (count === 0) {
        nintendo.forEach(nintendo => {
            nintendo.style.display = 'flex';
        });

        sega.forEach(sega => {
            sega.style.display = 'flex';
        });

        tectoy.forEach(tectoy => {
            tectoy.style.display = 'flex';
        });

        snk.forEach(snk => {
            snk.style.display = 'flex';
        });

        philips.forEach(philips => {
            philips.style.display = 'flex';
        });

        atari.forEach(atari => {
            atari.style.display = 'flex';
        });
    } else {
        // Exibe ou oculta os consoles com base no estado dos checkboxes individuais

        // Nintendo
        if (checkNintendo.checked) {
            nintendo.forEach(nintendo => {
                nintendo.style.display = 'flex';
            });
        } else {
            nintendo.forEach(nintendo => {
                nintendo.style.display = 'none';
            });
        }

        // Sega
        if (checkSega.checked) {
            sega.forEach(sega => {
                sega.style.display = 'flex';
            });
        } else {
            sega.forEach(sega => {
                sega.style.display = 'none';
            });
        }

        // Tectoy
        if (checkBoxTectoy.checked) {
            tectoy.forEach(tectoy => {
                tectoy.style.display = 'flex';
            });
        } else {
            tectoy.forEach(tectoy => {
                tectoy.style.display = 'none';
            });
        }

        // SNK
        if (checkBoxSnk.checked) {
            snk.forEach(snk => {
                snk.style.display = 'flex';
            });
        } else {
            snk.forEach(snk => {
                snk.style.display = 'none';
            });
        }

        // Philips
        if (checkBoxPhilips.checked) {
            philips.forEach(philips => {
                philips.style.display = 'flex';
            });
        } else {
            philips.forEach(philips => {
                philips.style.display = 'none';
            });
        }

        // Atari
        if (checkBoxAtari.checked) {
            atari.forEach(atari => {
                atari.style.display = 'flex';
            });
        } else {
            atari.forEach(atari => {
                atari.style.display = 'none';
            });
        }      
    }
}
