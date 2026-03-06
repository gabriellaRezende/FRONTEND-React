function positivos(num) {
    if (typeof window.somaPositivos === 'undefined') window.somaPositivos = 0;

    if (num !== -1) {
        if (num >= 0) {
            window.somaPositivos += num;
        }
        tv.innerHTML = `Soma atual: ${window.somaPositivos}. Introduza o próximo número ou -1 para terminar.`;
    } else {
        tv.innerHTML = `<h3>A soma dos números positivos é: ${window.somaPositivos}</h3>`;
        window.somaPositivos = 0;
    }
}


function ordenar(a, b, c) {
    switch (true) {
        case (a <= b && b <= c):
            return [a, b, c];
        case (a <= c && c <= b):
            return [a, c, b];
        case (b <= a && a <= c):
            return [b, a, c];
        case (b <= c && c <= a):
            return [b, c, a];
        case (c <= a && a <= b):
            return [c, a, b];
        case (c <= b && b <= a):
            return [c, b, a];
        default:
            return [a, b, c];
    }
}


function mdcFluxograma(a, b) {
    let maior = Math.max(a, b), menor = Math.min(a, b), r;
    do {
        r = maior % menor;
        maior = menor;
        menor = r;
    } while (menor > 0);
    return maior;
}
function dobro(num) {
    return parseInt(num) * 2;
}


function capicua(num) {
    let original = num;
    let rslt = 0;
    let r;

    if (num > 0) {
        do {
            r = num % 10;
            num = Math.floor(num / 10);
            rslt = rslt * 10 + r;
        } while (num > 0);

        if (rslt === original) {
            return "capicua";
        } else {
            return "não é capicua";
        }
    } else {
        return "ERRO";
    }
}