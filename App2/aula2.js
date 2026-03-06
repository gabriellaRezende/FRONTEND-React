const { parse } = require("path");

window.onload = function() {
    //alert("Pagina carregada com sucesso!");

    const txtinput = document.getElementById("txtinput");
    const tv = this.document.querySelector("#tv");

    const btdobro = document.getElementById("btdobro");
    btdobro.addEventListener("click",  (evt)=>{

        if (txtinput.value == "" || isNaN(txtinput.value)) {
            alert("Digite um número para calcular o dobro!");
            return;
        }
        tv.innerHTML = `<h3> O dobro de ${txtinput.value} = ${dobro(txtinput.value)} </h3>`;
    });

     const btsorteio = this.document.getElementById("btsorteio");
  btsorteio.addEventListener("click", (evt) => {
    evt.preventDefault();
    let argumentos = txtinput.value.split(",");
    console.log(argumentos);
    tv.textContent = sorteio(parseInt(argumentos[0]),parseInt(argumentos[1]));
  });

    const btsomaMuitos = this.document.getElementById("btsomaMuitos");
    btsomaMuitos.addEventListener("click", (evt) => {
        evt.preventDefault();
        let argumentos = txtinput.value.split(",");

        tv.textContent = "A soma é: " + somaMuitos(...argumentos);
    });

    let func = Xpto(parseInt(txtinput.value));
    const btclosure = this.document.getElementById("btclosure");
    btclosure.addEventListener("click", (evt) => {
        evt.preventDefault();
        //let inc = parseInt(txtinput.value);
        tv.textContent = func(2);
    });
}; 

function Xpto(base){
    let y = base; // === "undefined" || isNaN(base) || base == "" ? 0 : base;
    return function(inc){
        y += inc;
        return y;
    }

}

//4, 8, 12, 16 ,1
