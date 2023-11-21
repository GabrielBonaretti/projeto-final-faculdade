// Função para verificar a quantidade de itens no carrinho
function verify_cart() {
    var count3 = 0;
    var count_teste = 0;

    // Loop para percorrer os itens do carrinho armazenados no localStorage
    while (true) {
        count_teste += 1;
        var get_obj = localStorage.getItem(`rtr-str${count_teste}`);

        // Verifica se chegou ao limite máximo de itens ou se encontrou um item no localStorage
        if (count_teste >= 13) {
            break;
        } else if (get_obj != null) {
            count3 += 1;
            continue;
        } else {
            continue;
        }
    }

    // Exibe o carrinho vazio ou cheio com base na contagem de itens
    if (count3 == 0) {
        carrinho_vazio.style.display = "block";
        carrinho_cheio.style.display = "none";
        const valor_total_html = document.getElementById("preco-total");
        valor_total_html.innerHTML = `R$ ${0}`;
    } else {
        carrinho_vazio.style.display = "none";
        carrinho_cheio.style.display = "flex";
    }

    return count3;
}

// Função para deletar um item do carrinho
function delete_item(teste) {
    var x = teste.target.parentElement.parentElement;
    x.remove();
    localStorage.removeItem(`rtr-str${parseInt(x.id.substr(4, x.id.length - 1)) + 1}`);
    verify_cart();
    sum_items_price();
}

// Função para calcular o preço total dos itens no carrinho
function sum_items_price() {
    var preco = document.getElementsByClassName("price-product");
    var qnt_precos = document.getElementsByClassName("input-number");
    var valor_total = 0;

    // Loop para percorrer os itens e calcular o preço total
    for (var i = 0; i < preco.length; i++) {
        valor_total += parseFloat(preco[i].innerHTML.substring(10).replace(".", "").replace(",", ".")) * qnt_precos[i].value;
    }

    const valor_total_html = document.getElementById("preco-total");
    valor_total_html.innerHTML = `R$ ${valor_total.toFixed(2)}`;
    return valor_total;
}

// Função principal
const carrinho_vazio = document.getElementById("products-cart-vazio");
const carrinho_cheio = document.getElementById("products-cart-cheio");
var lista_items = [];

window.addEventListener("load", () => {
    verify_cart();

    // Obtenção dos itens do carrinho do localStorage
    var botoes_delete_teste = document.querySelectorAll(".botao-delete-item");
    var count2 = 0;
    while (count2 <= 13) {
        count2 += 1;
        var get_obj = localStorage.getItem(`rtr-str${count2}`);

        if (get_obj != null)
            lista_items.push(JSON.parse(get_obj));
    }

    // Criação das divs para exibir os itens no carrinho
    for (var i = 0; i < lista_items.length; i++) {
        if (lista_items.length === botoes_delete_teste.length) {
            continue;
        } else {
            carrinho_cheio.innerHTML += `
            <div id="item${lista_items[i].id}" class="container text-center">
                <div class="row row-cols-1 row-cols-lg-5 produtos-no-carrinho">
                    <img class="col items-product" src="${lista_items[i].src}">
                    <p class="col items-product text-cart-item">${lista_items[i].nome}</p>
                    <p class="col items-product text-cart-item price-product">${lista_items[i].preco}</p>
                    <div>
                        <p class="text-cart-item">Qnt.</p>
                        <input class="col items-product input-number" type="number" min="1" max="10" value="1">
                    </div>
                    <button class="col items-product btn-close botao-delete-item"></button>
                </div>
            </div>`;
        }
    }

    // Adiciona os event listeners aos inputs de quantidade
    input_numbers_qnt = document.querySelectorAll(".input-number");
    input_numbers_qnt.forEach(input_number => input_number.addEventListener("keyup", sum_items_price));
    input_numbers_qnt.forEach(input_number => input_number.addEventListener("change", sum_items_price));

    // Adiciona os event listeners aos botões de exclusão
    var botoes_delete = document.querySelectorAll(".botao-delete-item");
    botoes_delete.forEach(bt_del => bt_del.addEventListener("click", delete_item));

    sum_items_price();
});

// Manipulação do input de CEP
const cep = document.getElementById("cep");
cep.addEventListener("keydown", (e) => {
    const keyPressed = e.key;
    if (keyPressed !== "Backspace" && keyPressed !== "Delete") {
        if (cep.value.length == 5) {
            cep.value += "-";
        }
    }
});

// Abre o modal para confirmação da compra
var lista_items_modal = []
const botao_modal = document.getElementById("botao-buy");
botao_modal.addEventListener("click", () => {
    lista_items_modal = []
    var count_local = 0;
    while (count_local <= 13) {
        count_local += 1;
        var get_obj = localStorage.getItem(`rtr-str${count_local}`);

        if (get_obj != null)
            lista_items_modal.push(JSON.parse(get_obj));
    }




    const myModal = new bootstrap.Modal('#exampleModal', {
        keyboard: false
    });

    let precos = document.getElementsByClassName("input-number");
    let produtos_modal = document.getElementById("products");
    let descricao = document.getElementById("description-buy");
    console.log(precos)
    produtos_modal.innerHTML = `<h5>Items:</h5>`;
    descricao.innerHTML = ``;

    var cep = document.getElementById("cep").value.replace("-", "");
    var get_pessoa = localStorage.getItem(`pessoa`);
    let qnt_carrinho = verify_cart();
    let json_produto = JSON.parse(get_pessoa);
    let valor_total = sum_items_price();

    // Realiza a requisição para obter os dados do CEP
    if (cep.length == 8 && isFinite(cep) && qnt_carrinho > 0 && get_pessoa != null) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro != true) {
                    myModal.show();
                    console.log(lista_items_modal.length)
                    // Exibe os itens e informações no modal de confirmação
                    for (var i = 0; i < lista_items_modal.length; i++) {
                        produtos_modal.innerHTML += `
                            <div class="item-confimation">
                                <img src="${lista_items_modal[i].src}">
                                <div class="descriptiom-product">
                                    <p>${lista_items_modal[i].nome}</p>
                                    <p>${lista_items_modal[i].preco}</p>
                                    <p>QNT: ${precos[i].value}</p>
                                </div>
                            </div>`;

                        if (lista_items_modal.length != i + 1) {
                            produtos_modal.innerHTML += `
                                <div class="linha"></div>`;
                        }
                    }

                    descricao.innerHTML += `
                        <p id="nome">Nome: ${json_produto.nome}</p>
                        <p id="email">Email: ${json_produto.email}</p>
                        <p id="phone">Telefone: ${json_produto.phone}</p>
                        <p id="cep">CEP: ${data.cep}</p>
                        <p id="estado">Estado: ${data.uf}</p>
                        <p id="cidade">Cidade: ${data.localidade}</p>
                        <p id="bairro">Bairro: ${data.bairro}</p>
                        <p id="rua">Rua: ${data.logradouro}</p>
                        <p id="total-price">Total Price: R$ ${valor_total.toFixed(2)}</p>`;

                // Tratamente do erro caso o CEP seja invalido
                } else { 
                    Swal.fire(
                        'Check you CEP',
                        'Please check if your entered CEP is valid.',
                        'error'
                    )
                }
            })

    // Tratamente do erro caso a pessoa nao tenha se registrado
    } else if (get_pessoa == null) {
        Swal.fire(
            'You forgot something to register yourself',
            'Please check if you registered your data in page contact us.',
            'error'
        )

        Swal.fire({
            title: 'You forgot something to register yourself',
            text: 'Please check if you registered your data in page contact us.',
            icon: 'error',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                location.href = '../views/contact-us.html'
            }
        })
    
    // Tratamente do erro caso a quantidade do carrinho seja 0
    } else if (qnt_carrinho <= 0) {
        Swal.fire(
            'The cart are empty',
            'Please add something to cart to continue shopping.',
            'error'
        )

    // Tratamente do erro caso o CEP seja invalido
    } else {
        Swal.fire(
            'Check you CEP',
            'Please check if your entered CEP is valid.',
            'error'
        )
    }
})


// confirmar compra removendo o item do localstorage e consequentemente limpando o carrinho

const botao_confirmar = document.getElementById("botao-confirmar")

botao_confirmar.addEventListener("click", () => {
    for (var i = 0; i < lista_items_modal.length; i++) {
        localStorage.removeItem(`rtr-str${lista_items_modal[i].id + 1}`);
    }

    lista_items_modal = []

    verify_cart()

    Swal.fire(
        'Your purchase has been registered',
        'Thank you for choosing our store.',
        'success'
    )
})

