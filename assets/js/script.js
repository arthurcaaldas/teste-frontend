const abrir_formulario = $('#abrir-formulario');
const formulario = $('#formulario-pergunta');

const input_pergunta = $('#input-pergunta');
const add_pergunta = $('#adiciona-pergunta');
const cancelar_pergunta = $('#cancelar-pergunta');
const deletar_pergunta = $('.deletar-pergunta');

const perguntas = $('#pesquisa-perguntas');
const enviar_pesquisa = $('#enviar-pesquisa');

const DB_STORAGE = 'database-doity';
const db = localStorage.getItem(DB_STORAGE);

let form_esta_aberto = false;

abrir_formulario.on('click', () => openForm());
cancelar_pergunta.on('click', () => closeForm());

let items = [];

$(window).on('load', () => {
    items = JSON.parse(db);
    if (!items) return;
    $.each(items.reverse(), (_, value) => add_pergunta_template(value));
});

add_pergunta.on('click', () => {
    let value = input_pergunta.val();

    if (value) {
        // Continuar daqui
        if (!db) {
            items.push(value);
        } else {
            console.log(...JSON.parse(db))
            items = [...JSON.parse(db)].unshift(value);
        }

        localStorage.setItem(DB_STORAGE, JSON.stringify(items));

        add_pergunta_template(value);
        closeForm();
    }
});

$(document).on('click', '.deletar-pergunta', (e) => {
    const value = $(e.target).parents('td').prev().data('th');
    $(e.target).parents('tr').remove();
    const items = JSON.parse(db);
    const indexToBeRemove = items.findIndex(item => item === String(value));
    items.splice(indexToBeRemove, 1);
    localStorage.setItem(DB_STORAGE, JSON.stringify(items));
});

const openForm = () => {
    form_esta_aberto = true;
    abrir_formulario.hide();
    enviar_pesquisa.hide();
    formulario.show();
}

const closeForm = () => {
    form_esta_aberto = false;
    abrir_formulario.show();
    enviar_pesquisa.show();
    formulario.hide();
    clearInput();
}

const clearInput = () => {
    input_pergunta.val('');
}

const add_pergunta_template = (value) => {
    perguntas.prepend(
        `<tr><td data-th="${value}" style="padding: 17.5px 10px;">${value}</td><td data-th="Ações" style="text-align: center;"><a href="https://doity.com.br/admin/pesquisas_perguntas/edit/11638"><img src="/assets/images/icons-editar-12px.png" width="14px" height="14px" alt=""></a><button class="deletar-pergunta botao-grande" type="button"><img src="assets/images/delete.svg" width="14px" height="14px" alt=""></button></td></tr>`
    );
}