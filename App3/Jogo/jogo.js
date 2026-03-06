window.onload = function() {
    //this.alert("xxx");
    aluno1={
        num:1,
        nome:"jose",
        fala:function(str){
            console.log(`${str} sou o ${this.nome}`);
        }
    };

    aluno2={
        num:2,
        nome:"maria"
        }


    aluno1.fala("oi! ...");
    aluno1.fala.call(aluno2,"Boa Noite") //call chama uma função no contexto de outro objeto 
    aluno1.fala.apply(aluno2,["Bom Dia"]) //apply é igual ao call, mas aceita um array de argumentos  

    for (const campo in aluno1) {
        console.log(`${campo} - ${aluno1[campo]}`);
    }
};
