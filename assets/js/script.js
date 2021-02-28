let table_content = document.querySelector("#table_content");

let btn_search = document.querySelector("#btn_search");

date_year.innerHTML = `&copy  ${new Date().getFullYear()}  &nbsp;|`;

if (cep_search) {
    cep_search.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        if (key == 13) { // Código da tecla enter
            btn_search.onclick();
        }
    });
};

btn_search.onclick = function () {

    // let cep = document.querySelector("#cep_search").value;

    // Coloca somente dígitos.
    let cep = $("#cep_search").val().replace(/\D/g, '');
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    //Expressão regular para validar o CEP.
    let validacep = /^[0-9]{8}$/;

    if (cep != '' && validacep.test(cep)) {
        $.ajax({
            url: url,
            type: "GET",
            error: function () {
                $("#table_content").html('<h2>CEP inválido.</h2>');
            },
            success: function (response) {

                if (!response.erro) {
                    table_content.innerHTML = [
                        '<table border="1">',
                        '<caption>INFORMAÇÕES</caption>',
                        '<tbody>',
                        '<tr>',
                        '<td>CEP</td>',
                        '<td>' + response.cep + '</td>',
                        '</tr>',
                        '<tr>',
                        '<td>Localidade</td>',
                        '<td>' + response.localidade + '</td>',
                        '</tr>',
                        '<tr>',
                        '<td>UF</td>',
                        '<td>' + response.uf + '</td >',
                        '</tr>',
                        '<tr>',
                        '<td>DDD</td>',
                        '<td>' + response.ddd + '</td>',
                        '</tr>',
                        '<tr>',
                        '<td>IBGE</td>',
                        '<td>' + response.ibge + '</td>',
                        '</tr>',
                        '</tbody>',
                        '</table>',
                    ].join("\n");
                } else {
                    $("#table_content").html('<h2>CEP inválido.</h2>');
                }
                // console.log(response);
            }
        });
    }
    else
        $("#table_content").html('<h2>Preencha a caixa com algum CEP.</h2>');
}
