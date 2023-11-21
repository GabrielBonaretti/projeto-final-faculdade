// Seleciona os elementos do formulário
const name = document.getElementById("full-name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

// Seleciona o botão de registro
const botaoRegistrar = document.getElementById("button-form");

// Adiciona um evento de clique ao botão de registro
botaoRegistrar.addEventListener("click", () => {
    // Verifica se todos os campos do formulário são válidos
    if (validateName(name) && validateEmail(email) && validatePhone(phone)){
        // Cria um objeto JSON com os dados da pessoa
        var json_pessoa = {
            "nome": name.value,
            "email": email.value,
            "phone": phone.value
        };

        // Converte o objeto JSON em uma string
        var json_pessoa_string = JSON.stringify(json_pessoa);

        // Armazena a string no localStorage com a chave "pessoa"
        localStorage.setItem(`pessoa`, json_pessoa_string);

        // Exibe uma mensagem de sucesso usando a biblioteca Swal
        Swal.fire(
            'User has been registered',
            '',
            'success'
        );

        // Limpa os campos do formulário
        name.value = "";
        email.value = "";
        phone.value = "";
        
    } else {
        // Exibe uma mensagem de erro usando a biblioteca Swal
        Swal.fire(
            'User has not been registered',
            'Please check your entered data ',
            'error'
        );
    }
});

// Adiciona um evento de pressionar tecla ao campo de telefone
phone.addEventListener("keydown", (e) => {
    const keyPressed = e.key;
    if (keyPressed !== "Backspace" && keyPressed !== "Delete") {
        // Formata o campo de telefone automaticamente
        if (phone.value.length == 0) {
            phone.value += "(";
        } else if (phone.value.length == 3) {
            phone.value += ")";
        } else if (phone.value.length == 9) {
            phone.value += "-";
        }
    }
});

// Função para validar o campo de nome
function validateName(name) {
    if (name.value != "") {
        return true;
    }
}

// Função para validar o campo de email
function validateEmail(email) {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const isValidEmail = emailRegex.test(`${email.value}`);
    console.log(isValidEmail)
    return isValidEmail;
}

// Função para validar o campo de telefone
function validatePhone(phone) {
    let phone_certo = phone.value.replace("(", "").replace(")", "").replace("-", "")
    if (phone_certo.value != "" && phone_certo.length == 11) {
        return true;
    }
    
}
