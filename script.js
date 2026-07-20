
function lerValorSeguro(id) {
    const elemento = document.getElementById(id);
    if (!elemento || elemento.value.trim() === "") {
        return 0; 
    }
    let campo = elemento.value.trim();
    campo = campo.replace(/\./g, '').replace(',', '.');
    return parseFloat(campo);
}

function lerInteiroSeguro(id) {
    const elemento = document.getElementById(id);
    if (!elemento || elemento.value.trim() === "") {
        return NaN;
    }
    return parseInt(elemento.value);
}

function calcularRetroativo() {

    const valorDisciplina = lerValorSeguro('valorDisciplina');
    const qtdNovas = lerInteiroSeguro('qtdNovas');
    const boletoAtual = lerInteiroSeguro('boletoAtual');
    
    
    const desconto1 = lerValorSeguro('desconto1');
    const desconto2 = lerValorSeguro('desconto2');
    const desconto3 = lerValorSeguro('desconto3');
    const desconto4 = lerValorSeguro('desconto4');

    if (isNaN(valorDisciplina) || valorDisciplina === 0 || isNaN(qtdNovas) || isNaN(boletoAtual)) {
        alert("Por favor, preencha o valor da disciplina, a quantidade e o número do boleto.");
        return;
    }

    // 2. Cálculo da mensalidade bruta das disciplinas adicionadas
    const valorBrutoMensal = valorDisciplina * qtdNovas;

    // 3. Aplicação dos descontos sucessivos (desmembrados)
    let valorLiquidoMensal = valorBrutoMensal * (1 - (desconto1 / 100));
    valorLiquidoMensal = valorLiquidoMensal * (1 - (desconto2 / 100));
    valorLiquidoMensal = valorLiquidoMensal * (1 - (desconto3 / 100));
    valorLiquidoMensal = valorLiquidoMensal * (1 - (desconto4 / 100));

    // 4. Cálculo do impacto retroativo no boleto atual (Meses passados + Mês atual)
    const valorCobradoNesteBoleto = valorLiquidoMensal * boletoAtual;

    // 5. Formatação para Moeda Brasileira (BRL)
    const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // O id 'resultadoMensal' no HTML deve mostrar o ACUMULADO RETROATIVO (que é a variável valorCobradoNesteBoleto)
    document.getElementById('numBoleto').innerText = boletoAtual;
    document.getElementById('resultadoMensal').innerText = formatarMoeda(valorCobradoNesteBoleto);

    let infoProximos = "";
    if (boletoAtual === 6) {
        infoProximos = "Este é o último boleto do semestre. Não há cobranças futuras.";
    } else {
        infoProximos = `Para os boletos de ${boletoAtual + 1} até 6, o acréscimo será apenas a mensalidade normal de ${formatarMoeda(valorLiquidoMensal)}.`;
    }
    
    document.getElementById('resultadoProximos').innerText = infoProximos;
    document.getElementById('resultado').style.display = "block";
}