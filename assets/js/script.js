const abrir_formulario = $('#abrir-formulario');
const formulario = $('#formulario-pergunta');

const input_pergunta = $('#input-pergunta');
const add_pergunta = $('#adiciona-pergunta');
const cancelar_pergunta = $('#cancelar-pergunta');

const perguntas = $('#pesquisa-perguntas');
const enviar_pesquisa = $('#enviar-pesquisa');

const DB_STORAGE = 'database-doity';

let form_esta_aberto = false;
let items = [];

abrir_formulario.on('click', () => openForm());
cancelar_pergunta.on('click', () => closeForm());

$(window).on('load', () => {
    const saved = localStorage.getItem(DB_STORAGE);

    if (saved) {
        items = JSON.parse(saved);
        items.slice().reverse().forEach(item => add_pergunta_template(item));
    }
});

add_pergunta.on('click', () => {
    const value = input_pergunta.val().trim();
    if (!value) return;

    const db = localStorage.getItem(DB_STORAGE);

    if (!db) {
        items = [value];
    } else {
        items = JSON.parse(db);
        items.unshift(value);
    }

    localStorage.setItem(DB_STORAGE, JSON.stringify(items));

    add_pergunta_template(value);
    closeForm();
});

$(document).on('click', '.deletar-pergunta', (e) => {
    const value = $(e.target).closest('td').prev().data('th');

    $(e.target).closest('tr').remove();

    let items = JSON.parse(localStorage.getItem(DB_STORAGE)) || [];

    const index = items.indexOf(value);
    if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem(DB_STORAGE, JSON.stringify(items));
    }
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
    perguntas.prepend(`
        <tr>
            <td data-th="${value}" style="padding: 17.5px 10px;">${value}</td>
            <td data-th="Ações" style="text-align: center;">
                <a href="https://doity.com.br/admin/pesquisas_perguntas/edit/11638">
                    <img src="/assets/images/icons-editar-12px.png" width="14" height="14" alt="">
                </a>
                <button class="deletar-pergunta botao-grande" type="button">
                    <img src="assets/images/delete.svg" width="14" height="14" alt="">
                </button>
            </td>
        </tr>`
    );
}
