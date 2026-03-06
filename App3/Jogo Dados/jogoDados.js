function Jogo(_jogador, _montante){
    this.Jogador= _jogador;
    this.Montante= _montante;

    this.ver = function(){
        let txtjogador = document.getElementById("txtjogador");
        let txtmontante = document.getElementById("txtmontante");
        txtjogador.value=this.Jogador;
        txtmontante.value=this.Montante;
    }
}

function JogoDados(_jogador, _montante){
    /* this.Dados =[
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1]; */
    this.Dados =[6, 4];
    Jogo.call(this, _jogador, _montante);
    this.ver = function(){
        JogoDados.prototype.ver.call(this);
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        img1.setAttribute("src", `Dados/${this.Dados[0]}.png`);
        img2.setAttribute("src", `Dados/${this.Dados[1]}.png`);

    };

    this.jogar = function(aposta){
       if (aposta <= this.Montante)this.Montante -= aposta;
       else if(this.Montante > 0){aposta = this.Montante; this.Montante = 0;}
       else aposta = 0;
       if(aposta > 0){
        this.Dados[0]= Math.floor(Math.random() * 6) + 1;
        this.Dados[1]= Math.floor(Math.random() * 6) + 1;
        if(this.Dados[0] === this.Dados[1]) this.OnIguais(this, aposta);
        this.ver();
       }

       this.OnIguais = function(Sender, Aposta){
        var evento = new CustomEvent("oniguais", {
            detail: {sender: Sender, aposta: Aposta},
            bubbles: true, // Permite que o evento se propague para os elementos pais
            cancelable: true // Permite que o evento seja cancelado
        });
        document.dispatchEvent(evento); // evento é o disparo remoto do evento
       };
    };
}
// o prototype é o objeto que será usado como protótipo para criar novos objetos. Ele é uma propriedade de função, e é usado para compartilhar métodos e propriedades entre objetos criados a partir da mesma função construtora. Quando um novo objeto é criado usando a função construtora, ele herda as propriedades e métodos do protótipo da função. Isso permite que os objetos compartilhem comportamento comum sem precisar duplicar código.
JogoDados.prototype = new Jogo();
JogoDados.prototype.constructor = JogoDados;