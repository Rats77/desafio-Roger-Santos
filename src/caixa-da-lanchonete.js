const menu = [
  {
    codigo: "cafe",
    descricao: "Café",
    valor: 3.0,
    principal: true,
  },
  {
    codigo: "chantily",
    descricao: "Chantily(extra no café)",
    valor: 1.5,
    principal: false,
  },
  {
    codigo: "suco",
    descricao: "Suco Natural",
    valor: 6.2,
    principal: true,
  },
  {
    codigo: "sanduiche",
    descricao: "Sanduíche",
    valor: 6.5,
    principal: true,
  },
  {
    codigo: "queijo",
    descricao: "Queijo (extra do Sanduíche)	",
    valor: 2.0,
    principal: false,
  },
  {
    codigo: "salgado",
    descricao: "Salgado",
    valor: 7.25,
    principal: true,
  },
  {
    codigo: "combo1",
    descricao: "1 Suco e 1 Sanduíche",
    valor: 9.5,
    principal: false,
  },
  {
    codigo: "combo2",
    descricao: "1 Café e 1 Sanduíche",
    valor: 7.5,
    principal: false,
  },
];
const Payments = ["dinheiro", "debito", "credito"];

class CaixaDaLanchonete {
  getItemById(id) {
    return menu.find((m) => m.codigo === id);
  }
  calcularValorDaCompra(metodoDePagamento, itens) {
    let valorBase = 0;
    let hasPrincipal = false;
    let errorMessage = "";
    itens.map((item) => {
      const itemQtd = item.split(",");
      const findedItem = this.getItemById(itemQtd[0]);
      if (Number(itemQtd[1]) === 0) {
        errorMessage = "Quantidade inválida!";
      }
      if (!findedItem) {
        errorMessage = "Item inválido!";
      }
      if (findedItem && findedItem?.principal) {
        hasPrincipal = true;
      }
      console.log("Finded Item:", findedItem);
      if (findedItem) {
        valorBase = valorBase + findedItem.valor * Number(itemQtd[1]);
      }
    });
    if (errorMessage) {
      return errorMessage;
    }
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }
    if (!hasPrincipal) {
      return "Item extra não pode ser pedido sem o principal";
    }
    if (!Payments.find((payment) => payment === metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    if ("dinheiro" === metodoDePagamento) {
      const desconto = valorBase * (5 / 100);
      valorBase = valorBase - desconto;
    }
    if ("credito" === metodoDePagamento) {
      const acrescimo = valorBase * (3 / 100);
      valorBase = valorBase + acrescimo;
    }
    return "R$ " + valorBase.toLocaleString("pt-BR",{maximumFractionDigits: 2,minimumFractionDigits: 2});
  }
}

export { CaixaDaLanchonete };
/*new CaixaDaLanchonete()
  .calcularValorDaCompra('debito', ['chantily,1']);*/
