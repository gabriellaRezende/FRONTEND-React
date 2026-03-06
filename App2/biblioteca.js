const { func } = require("ts-interface-checker");

function dobro(num) {
    return parseInt(num) * 2;
}

/* function sorteio(num) {
    return Math.floor(Math.random() * num) + 1;
} */

function sorteio(num,total){
  total =(total > 19)? 5:total;
  let magico = num % 19;
  let exercicios =[magico];
  for(i=1;i<total;i++){
     let escolhido = ((exercicios[i-1] + 4)%19) == 0 ? 1:(exercicios[i-1] + 4)%19;
     exercicios.push(escolhido);
  }
  return "Exercícios para resolver:" +  exercicios.join(",");
}


function somaMuitos(){
    let soma = 0;
    for(i=0; i<arguments.length; i++){
        soma += parseInt(arguments[i]);
    }
    return soma;
}