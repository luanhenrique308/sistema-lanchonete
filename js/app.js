var Produtos = [
    {
        Sucos:[
            {
                id:1,
                tipo:"suco de acerola",
                preco:3,
                img: "../icons/sucos/acerola.png"
            },
            {
                id:2,
                tipo:"suco de limão",
                preco:2,
                img: "../icons/sucos/limao.png"
            },
            {
                id:3,
                tipo:"suco de tamarindo",
                preco:5,
                img: "../icons/sucos/tamaro.png"
            },
            {
                id:4,
                tipo:"suco de uva",
                preco:4,
                img: "../icons/sucos/uva.png"
            }
        ],
    },
    {
        Lanches:
        [

            {
                id:5,
                tipo:"batata frita",
                preco:5,   
                img: "../icons/lanches/batatas-fritas.png" 
            },
            {
                id:6,
                tipo:"cachorro quente",
                preco:4,   
                img: "../icons/lanches/cachorro-quente.png"
            },
            {
                id:7,
                tipo:"hamburguer",
                preco:2,   
                img: "../icons/lanches/hamburguer.png"
            },
            {
                id:8,
                tipo:"fatia de pizza",
                preco:5,   
                img: "../icons/lanches/pizza.png"
            }
        ]
    }
]


var quantidade =0;
var precoTotal;
var ArrayProdutoSelecionado ;
// var ProdutoSelecionado;
var ArrayProdutosVendidos = []
var UltraSistema = {
    CarregarCategorias: function(pObjeto){
        var elementoCategorias = document.getElementById("categorias");
        var categoria=''
        for (let index = 0; index < pObjeto.length; index++) { 
            categoria += `<div class="listaCategoria" index=${index} >${Object.keys(pObjeto[index])}</div>`
            elementoCategorias.innerHTML = categoria
        };
        elementoCategorias.addEventListener('click', (e)=>{
            if(e.target.className == 'listaCategoria'){
                var categoriaSelecionada = e.target;
                var index = parseInt(categoriaSelecionada.getAttribute('index'));
                UltraSistema.CarregarProdutosCategarias(Object.values(pObjeto[index]));
                UltraSistema.ZerarHtml();
                e.stopImmediatePropagation();
            };
        });
    },
    CarregarProdutosCategarias: function(pObjeto){
        var arrayProdutos = pObjeto[0]
        
        var elementoProdutos = document.getElementById("produtos")
        var produto = "";
        var groupProduto = "";
        var iconsProduto=""
        for (let index = 0; index < arrayProdutos.length; index++) {
            
            var produtoObjeto=arrayProdutos[index]
            iconsProduto = `<img class='imagemProduto' src=${produtoObjeto.img} alt="">`
            produto += `<div indexProduto=${index} id=${produtoObjeto.tipo}  class='produto'>
                            ${iconsProduto} 
                            <div id="descricao" indexProduto=${index} class="descricao">
                                ${produtoObjeto.tipo} 
                                <p class="precoProduto"> R$ ${produtoObjeto.preco} </p>
                            </div>
                        </div>`;
            elementoProdutos.innerHTML = produto;
        }

        elementoProdutos.addEventListener('click', (e)=>{
            if(e.target.className == 'produto' || e.target.className == 'descricao'){
                var produtoSelecionado =  e.target
                var index = parseInt(produtoSelecionado.getAttribute('indexProduto'));
                ArrayProdutoSelecionado = arrayProdutos[index];
                UltraSistema.CarregarCaixa();
            };
        });
    },
    CarregarCaixa: function(){
        quantidade = 1;
        UltraSistema.AtualizarHtmlCaixa(quantidade);
        this.AtualizarQuantidadeProduto();
        this.AdicionarProdutoVendido()
    },
    AtualizarQuantidadeProduto: function(){
        document.getElementById('adicionar').addEventListener('click', function(e){
            if(ArrayProdutoSelecionado != ' '){    
                quantidade++;
                UltraSistema.AtualizarHtmlCaixa(quantidade);
                e.stopImmediatePropagation();
            }
        });
        document.getElementById('diminuir').addEventListener('click', function(e){
            if(ArrayProdutoSelecionado != ' '){    
                quantidade--;
                UltraSistema.AtualizarHtmlCaixa(quantidade);
                e.stopImmediatePropagation();
            }
        });
    },
    ZerarHtml: function(){
        quantidade = 0;
        ArrayProdutoSelecionado = ' '

        var valorUnitario = document.getElementById('valorUnitario');
        valorUnitario.innerHTML = 'R$ 0';

        var quantidaProduto = document.getElementById("valorTotal");
        quantidaProduto.innerHTML = 'R$ 0';

        var inputQuantidade = document.getElementById("quantidade");
        inputQuantidade.value = quantidade;

        var nomeProduto = document.getElementById('nomeProduto');
        nomeProduto.innerHTML = ''
    },
    AtualizarHtmlCaixa: function(quantidade){
        var inputQuantidade = document.getElementById("quantidade");
        inputQuantidade.value = quantidade;

        var valorUnitario = document.getElementById('valorUnitario');
        valorUnitario.innerText = "R$ "+ ArrayProdutoSelecionado.preco;

        var nomeProduto = document.getElementById('nomeProduto');
        nomeProduto.innerHTML =  ArrayProdutoSelecionado.tipo 

        precoTotal = ArrayProdutoSelecionado.preco * quantidade;
        var quantidaProduto = document.getElementById("valorTotal");
        quantidaProduto.innerText = "R$ " + precoTotal;
        
    },
    AdicionarProdutoVendido: function(){
        var adicionarProdutoLista = document.getElementById('AdcionarProdutoLista');
        adicionarProdutoLista.addEventListener('click', function(e){
            if(ArrayProdutoSelecionado != ' '){
                ArrayProdutoSelecionado['quantidade'] = quantidade
                ArrayProdutoSelecionado['valorTotal'] = precoTotal
                ArrayProdutosVendidos.push(ArrayProdutoSelecionado);
                UltraSistema.SomarTotalCompra()
                UltraSistema.CarregarItensVendidos();
                UltraSistema.ZerarHtml()
                e.stopImmediatePropagation();
            }
            // console.log(ArrayProdutoSelecionado.length)
            
        });
    },
    CarregarItensVendidos: function(){
        $("#table tbody tr").remove();
        for (let index = 0; index < ArrayProdutosVendidos.length; index++) {
            var produtoTemp = ArrayProdutosVendidos[index];
            UltraSistema.AdicionarProdutoTabela(produtoTemp);
        };
    },
    AdicionarProdutoTabela: function(produto){
        var produtoAdicionado = produto;
        
        var tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
        var newRow = tbodyRef.insertRow();

        var newCell = newRow.insertCell();
        newCell.innerHTML = produtoAdicionado.tipo;

        var newCell1 = newRow.insertCell();
        newCell1.innerHTML = produtoAdicionado.quantidade;

        var newCell2 = newRow.insertCell();
        newCell2.innerHTML = produtoAdicionado.valorTotal;
        
        var button = document.createElement('div');
        button.className = 'excluir';
        button.innerText = "X";
        button.setAttribute('idProduto', produtoAdicionado.id);
        
        var newCell3 = newRow.insertCell();
        newCell3.appendChild(button);
        button.addEventListener('click', function(e){
            UltraSistema.ExcluirProdutoTabela(this);
            e.stopImmediatePropagation();
        });
    },
    ExcluirProdutoTabela: function(produtoExcluir){
        var idProduto = parseInt(produtoExcluir.getAttribute('idProduto'));
        for (let index = 0; index < ArrayProdutosVendidos.length; index++) {
            if(ArrayProdutosVendidos[index].id == idProduto){
                ArrayProdutosVendidos.splice(index, 1);
            };   
        };
        this.SomarTotalCompra()
        this.CarregarItensVendidos();
    },
    SomarTotalCompra: function(){
        var totalCompra = document.getElementById('totalCompra');
        var valorTotalCompra = ArrayProdutosVendidos.reduce((tot, pObjeto)=>{
            return tot + pObjeto.valorTotal
        }, 0)
        totalCompra.innerHTML = "Valor Total:  R$" + valorTotalCompra
        console.log(valorTotalCompra);
    }
};

UltraSistema.CarregarCategorias(Produtos);
