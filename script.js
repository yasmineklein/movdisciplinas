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

    // 4. Cálculo APENAS do impacto retroativo (Meses passados)
    const mesesRetroativos = boletoAtual - 1;
    const valorApenasRetroativo = valorLiquidoMensal * mesesRetroativos;

    
    const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    
    document.getElementById('numBoleto').innerText = boletoAtual;
    
    document.getElementById('valorLiquidoMensal').innerText = formatarMoeda(valorApenasRetroativo);

    let infoProximos = "";
    
    
    if (boletoAtual === 6) {
        infoProximos = `Este é o último boleto do semestre. A mensalidade de ${formatarMoeda(valorLiquidoMensal)} já será cobrada nesta fatura.`;
    } 
    
    document.getElementById('resultadoProximos').innerText = infoProximos;
    document.getElementById('resultado').style.display = "block";
}
