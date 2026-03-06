alfa = [7, 3, 2, 4];
bravo = [];
window.onload = function () {
  const tv = document.getElementById("tv");
  const input = document.querySelector("txt");
  ver();

  //Função pop remove o último elemento do array e retorna ele, push adiciona um elemento no final do array
  const btpoppush = document.querySelector("#btpoppush");
  btpoppush.addEventListener("click", () => {
    if (alfa.length > 0) {
      bravo.push(alfa.pop());
      ver();
    }
  });

  //Função shift remove o primeiro elemento do array e retorna ele, unshift adiciona um elemento no início do array
  const btshiftunshift = document.querySelector("#btshiftunshift");
  btshiftunshift.addEventListener("click", () => {
    if (alfa.length > 0) {
      bravo.unshift(alfa.shift());
      ver();
    }
  });

  //Função splice remove um elemento do array e retorna ele, splice(posição, quantidade de elementos a remover)
  const btslice = document.querySelector("#btslice");
  btslice.addEventListener("click", () => {
    if (txtinput.value != "" || !isNaN(txtinput.value)) {
      args = txtinput.value.split(",").map((x) => parseInt(x)); //transforma a string em um array de números, split(",") separa a string em um array de strings, map((x) => parseInt(x)) transforma cada string em um número inteiro
      console.log(args);
    }
    bravo = alfa.slice(...args);
    ver();
  });

  const btsplice = document.querySelector("#btsplice");
  btsplice.addEventListener("click", () => {
    args = txtinput.value.split(",").map((x) => parseInt(x));
    bravo = alfa.splice(...args);
    ver();
  });

  //Função map percorre o array e retorna um novo array com os resultados da função aplicada a cada elemento do array original
  const btmap = document.querySelector("#btmap");
  btmap.addEventListener("click", () => {
    bravo=alfa.map((x,i)=>x**2);
    let t = "<table>";
    linhas = alfa.map(v => `<tr><td>${v}</td><td>`);
    t+=linhas.join("") + "</table>";
    tv.innerHTML = t;
    ver();
  });

  //Função forEach percorre o array e executa uma função para cada elemento do array, não retorna um novo array
  const btforeach = document.querySelector("#btforeach");
  btforeach.addEventListener("click", () => {
    alfa.forEach((v, i,a) => {
      bravo.push(v);
      a[i] = 0;
    });
    ver();
  });

  //Função reduce percorre o array e retorna um único valor, a função recebe dois parâmetros, o acumulador e o elemento atual, o acumulador é o valor retornado pela função na iteração anterior, o elemento atual é o elemento do array que está sendo processado na iteração atual
  const btreduce = document.querySelector("#btreduce");
  btreduce.addEventListener("click", () => {
    bravo[0] = alfa.reduce((ac, e) => ac + parseInt(e), 1000);
    ver();
    });


  //Função filter percorre o array e retorna um novo array com os elementos que passaram no teste implementado pela função fornecida, a função recebe um elemento do array como parâmetro e deve retornar true ou false, se retornar true o elemento é adicionado ao novo array, se retornar false o elemento é descartado
  const btfilter = document.querySelector("#btfilter");
  btfilter.addEventListener("click", () => {
    bravo = alfa.filter((x) => x % 2 === 0);
    ver();
    });

  //Função sort ordena os elementos do array, a função recebe dois elementos do array como parâmetros e deve retornar um número negativo se o primeiro elemento deve ser ordenado antes do segundo, um número positivo se o primeiro elemento deve ser ordenado depois do segundo, ou zero se os dois elementos são iguais
  const btsort = document.querySelector("#btsort");
  btsort.addEventListener("click", () => {
    bravo = alfa.sort((a, b) => parseInt(a) - parseInt(b));
    ver();
    });
  
};

function ver() {
  tv.innerHTML = `alfa:${alfa.join(", ")} <br/> bravo:${bravo.join(", ")} `;
}
