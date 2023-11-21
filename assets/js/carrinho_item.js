// Contagem do número de itens no carrinho
const carrinho_vazio = document.getElementById("carrinho-vazio");
const carrinho_cheio = document.getElementById("carrinho-cheio");

var count3 = 0; // Variável para armazenar a contagem de itens
var count_teste = 0; // Variável para iterar sobre os itens no armazenamento local
while (true) {
    count_teste += 1;
    var get_obj = localStorage.getItem(`rtr-str${count_teste}`);
    if (count_teste >= 13) {
        break;
    } else if (get_obj != null) {
        count3 += 1;
        continue;
    } else {
        continue;
    }
}
let qnt_items = document.getElementById("qnt-carrinho");
qnt_items.innerHTML = count3; // Exibe o número de itens no carrinho na página

// Atualização da contagem de itens no carrinho ao clicar em qualquer lugar da página
document.addEventListener("click", () => {
    var count3 = 0;
    var count_teste = 0;
    while (true) {
        count_teste += 1;
        var get_obj = localStorage.getItem(`rtr-str${count_teste}`);
        if (count_teste >= 13) {
            break;
        } else if (get_obj != null) {
            count3 += 1;
            continue;
        } else {
            continue;
        }
    }
    let qnt_items = document.getElementById("qnt-carrinho");
    qnt_items.innerHTML = count3;

    // Exibição do carrinho vazio ou cheio, dependendo do número de itens
    if (count3 == 0) {
        carrinho_vazio.style.display = "flex";
        carrinho_cheio.style.display = "none";
        const valor_total_html = document.getElementById("preco-total");
        valor_total_html.innerHTML = `R$ ${0}`; // Define o valor total como 0
    } else {
        carrinho_vazio.style.display = "none";
        carrinho_cheio.style.display = "flex";
    }
});

// Botão para adicionar item ao carrinho
try {
    let botao_add_cart = document.querySelector("#botao-add-cart");

    botao_add_cart.addEventListener("click", () => {
        var nome = document.getElementById("teste").innerHTML;
        var preco = document.getElementById("price").innerHTML;
        var img = document.getElementById("imagem-item").src;

        let count = 0; // Variável para armazenar o ID do item
        var count_testeando = 0;
        var teste = false;

        while (true) {
            var json = {
                "id": count,
                "nome": nome,
                "preco": preco,
                "src": img,
            };
            var json_string = JSON.stringify(json);

            count_testeando += 1;
            var obj = localStorage.getItem(`rtr-str${count_testeando}`);
            if (JSON.parse(obj) != null) {
                count += 1;
                if (JSON.parse(obj).nome == nome) {
                    var teste = true;
                    break;
                }
            } else {
                break;
            }
        }

        if (obj == null && teste == false) {
            Swal.fire(
                'Item added to cart',
                '',
                'success'
            );
            localStorage.setItem(`rtr-str${count+1}`, json_string); // Adiciona o item ao armazenamento local
        } else {
            Swal.fire(
                'The item is already in the cart',
                '',
                'error'
            );
        }
    });
} catch (e) {
    console.log();
}

// Botão para visualizar o carrinho
var lista_items = [];
var carrinho_link = document.getElementById("carrinho-link");

carrinho_link.addEventListener("click", () => {
    var botoes_delete_teste = document.querySelectorAll(".botao-delete-item");
    var count2 = 0;

    while (count2 <= 13) {
        count2 += 1;
        var get_obj = localStorage.getItem(`rtr-str${count2}`);
        if (get_obj != null) {
            lista_items.push(JSON.parse(get_obj)); // Armazena os itens do carrinho em uma lista
        }
    }

    for (var i = 0; i < lista_items.length; i++) {
        if (lista_items.length === botoes_delete_teste.length) {
            continue;
        } else {
            creating_item(i); // Cria a div do item no carrinho
        }
    }
    lista_items = []; // Limpa a lista de itens
    sum_items_price(); // Calcula o preço total dos itens

    input_numbers_qnt = document.querySelectorAll(".qnt-carrinho-produto input");
    input_numbers_qnt.forEach(input_number => input_number.addEventListener("change", sum_items_price));

    var botoes_delete = document.querySelectorAll(".botao-delete-item");
    botoes_delete.forEach(bt_del => bt_del.addEventListener("click", delete_item));
});

// Função para deletar um item do carrinho
function delete_item(teste) {
    var x = teste.target.parentElement;
    x.remove();
    localStorage.removeItem(`rtr-str${x.id.substr(4, x.id.length - 1)}`); // Remove o item do armazenamento local
    sum_items_price(); // Recalcula o preço total dos itens
}

// Função para criar a div do item no carrinho
function creating_item(i) {
    var carrinho_cheio = document.querySelector("#carrinho-cheio");

    var div_fora = document.createElement('div');
    div_fora.setAttribute("id", `item${i + 1}`);
    div_fora.setAttribute("class", "produtos-no-carrinho");
    carrinho_cheio.appendChild(div_fora);

    var imagem = document.createElement('img');
    imagem.setAttribute("src", `${lista_items[i].src}`);
    div_fora.appendChild(imagem);

    var texto_produto_carrinho = document.createElement('div');
    texto_produto_carrinho.setAttribute("class", "texto-produto-carrinho");
    div_fora.appendChild(texto_produto_carrinho);

    var texto_titulo = document.createElement('p');
    texto_titulo.innerHTML = `${lista_items[i].nome}`;
    texto_produto_carrinho.appendChild(texto_titulo);

    var qnt_carrinho_produto = document.createElement('div');
    qnt_carrinho_produto.setAttribute("class", "qnt-carrinho-produto");
    texto_produto_carrinho.appendChild(qnt_carrinho_produto);

    var texto_preco = document.createElement('p');
    texto_preco.innerHTML = `${lista_items[i].preco}`;
    qnt_carrinho_produto.appendChild(texto_preco);

    var botao_delete = document.createElement('button');
    botao_delete.setAttribute("class", "btn-close botao-delete-item");
    div_fora.appendChild(botao_delete);
}

// Função para calcular o preço total dos itens no carrinho
function sum_items_price() {
    var precos = document.getElementsByClassName("qnt-carrinho-produto");
    var valor_total = 0;
    for (var i = 0; i < precos.length; i++) {
        var preco = precos[i].querySelector('p').innerHTML;
        valor_total += parseFloat(preco.substr(9, preco.length - 1).replace(".", "").replace(",", "."));
    }

    const valor_total_html = document.getElementById("preco-total");
    valor_total_html.innerHTML = `R$ ${valor_total.toFixed(2)}`; // Exibe o preço total na página
}
