class Dado {
    constructor() {
        this._valor = 1;
    }

    get valor() {
        return this._valor;
    }

    lancar() {
        this._valor = Math.floor(Math.random() * 6) + 1;
    }
}

class Jogo {
    constructor(jogador, montante) {
        this._jogador = jogador;
        this._montante = Number(montante) || 0;
    }

    get jogador() {
        return this._jogador;
    }

    set jogador(valor) {
        this._jogador = valor;
    }

    get montante() {
        return this._montante;
    }

    set montante(valor) {
        this._montante = Number(valor) || 0;
    }
}

class JogoDados extends Jogo {
    constructor(jogador, montante) {
        super(jogador, montante);
        this.dado1 = new Dado();
        this.dado2 = new Dado();
        this.img1 = document.getElementById("img1");
        this.img2 = document.getElementById("img2");
        this.tv = document.getElementById("tv");
        this.txtJogador = document.getElementById("txtjogador");
        this.txtMontante = document.getElementById("txtmontante");
    }

    ver() {
        this.txtJogador.value = this.jogador;
        this.txtMontante.value = this.montante;
        this.img1.src = `Dados/${this.dado1.valor}.png`;
        this.img2.src = `Dados/${this.dado2.valor}.png`;
    }

    jogar(aposta) {
        if (this.montante <= 0) {
            this.tv.innerText = "Sem saldo para jogar.";
            return;
        }

        let apostaEfetiva = aposta;
        if (apostaEfetiva > this.montante) {
            apostaEfetiva = this.montante;
            this.montante = 0;
        } else {
            this.montante -= apostaEfetiva;
        }

        this.dado1.lancar();
        this.dado2.lancar();
        this.ver();

        if (this.dado1.valor === this.dado2.valor) {
            const evento = new CustomEvent("oniguais", {
                detail: {
                    sender: this,
                    aposta: apostaEfetiva
                }
            });
            document.dispatchEvent(evento);
            return;
        }

        this.tv.innerText = "Não saiu par. Tente novamente.";
    }
}

window.onload = function () {
    const jogo = new JogoDados("Zé Carioca", 2000);
    jogo.ver();

    document.addEventListener("oniguais", function (evt) {
        const premio = evt.detail.sender.dado1.valor * 2 * evt.detail.aposta;
        evt.detail.sender.montante += premio;
        evt.detail.sender.ver();
        evt.detail.sender.tv.innerText = `Parabéns ${evt.detail.sender.jogador}! Você ganhou ${premio.toFixed(2)}€!`;
    });

    document.getElementById("bt").addEventListener("click", function (evt) {
        evt.preventDefault();
        const nomeDigitado = jogo.txtJogador.value.trim();
        const montanteDigitado = Number(jogo.txtMontante.value);

        if (nomeDigitado.length > 0) {
            jogo.jogador = nomeDigitado;
        }
        if (!Number.isNaN(montanteDigitado) && montanteDigitado >= 0) {
            jogo.montante = montanteDigitado;
        }

        jogo.jogar(100);
    });
};
