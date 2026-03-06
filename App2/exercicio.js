window.onload = function() {
    const txtinput = document.getElementById("txtinput");
    const tv = this.document.querySelector("#tv");

const btpositivo = document.getElementById("btpositivo");
  btpositivo.addEventListener("click", () => {
    let numero = parseFloat(txtinput.value);
    positivos(numero);
  });
  
  const btordenar = document.getElementById("btordenar");
  btordenar.addEventListener("click", () => {
    let valores = txtinput.value.split(",").map(v => parseFloat(v.trim()));
    if (valores.length !== 3 || valores.some(isNaN)) {
      tv.innerHTML = "Por favor, introduza exatamente 3 números separados por vírgula.";
      return;
    }
    let [a, b, c] = valores;
    let ordenados = ordenar(a, b, c);
    tv.innerHTML = `<h3>Ordem ascendente: ${ordenados.join(", ")}</h3>`;
  });  
  
    const btmdc = document.getElementById("btmdc");
  btmdc.addEventListener("click", () => {
    let valores = txtinput.value.split(",").map(v => parseFloat(v.trim()));
    if (valores.length !== 2 || valores.some(isNaN)) {
      tv.innerHTML = "Por favor, introduza exatamente 2 números separados por vírgula.";
      return;
    }
    let [a, b] = valores;
    let resultado = mdcFluxograma(a, b);
    tv.innerHTML = `<h3>MaxDivisor de ${a} e ${b} é: ${resultado}</h3>`;
  });

  const btcapicua = document.getElementById("btcapicua");
  btcapicua.addEventListener("click", () => {
    let num = parseInt(txtinput.value);
    let resultado = capicua(num);
    tv.innerHTML = `<h3>${num}: ${resultado}</h3>`;
  });
};
