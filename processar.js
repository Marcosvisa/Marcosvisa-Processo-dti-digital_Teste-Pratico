const corpoTabela = document.getElementById('corpoTabela');
const mediaTurma = document.getElementById('mediaTurma');
const listaAcimaMedia = document.getElementById('listaAcimaMedia');
const listaBaixaFrequencia = document.getElementById('listaBaixaFrequencia');

 const totais = [0, 0, 0, 0, 0]; //soma das notas por disciplina
 let contadorAlunos = 0;
 const alunos = [];
 
document.getElementById('formAluno').addEventListener('submit', function (e) {
    e.preventDefault();

    const entrada = document.getElementById('entradaDados').value.trim();
    const dados = entrada.split(/\s+/); //separa por espaços

    if (dados.length !== 7) {
        alert('Insira exatamente 7 valores: Nome, 5 notas e frequência.');
        return;
    }

    const nome = dados[0];
    const notas = dados.slice(1, 6).map(parseFloat);
    const frequencia = parseFloat(dados[6]);

    const mediaAluno = (notas.reduce((a, b) => a + b, 0) / 5).toFixed(2);

    //atualiza totais
    for (let i = 0; i < 5; i++) {
        totais[i] += notas[i];
    }
    contadorAlunos++;

    //guarda aluno
    alunos.push({
        nome,
        notas,
        frequencia,
        media: parseFloat(mediaAluno)
    });

    //adiciona linha à tabela
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${nome}</td>
        <td>${notas[0]}</td>
        <td>${notas[1]}</td>
        <td>${notas[2]}</td>
        <td>${notas[3]}</td>
        <td>${notas[4]}</td>
        <td>${frequencia}%</td>
        <td>${mediaAluno}</td>
    `;
    corpoTabela.appendChild(tr);

    //média da turma
    const medias = totais.map(soma => (soma / contadorAlunos).toFixed(2));
    const mediaGeral = (medias.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 5).toFixed(2);

    mediaTurma.innerHTML = `
        <td><strong>Média da Turma</strong></td>
        <td>${medias[0]}</td>
        <td>${medias[1]}</td>
        <td>${medias[2]}</td>
        <td>${medias[3]}</td>
        <td>${medias[4]}</td>
        <td>-</td>
        <td><strong>${mediaGeral}</strong></td>
    `;


    atualizarCards(mediaGeral);

    //limpa o campo
    document.getElementById('entradaDados').value = '';
});

function atualizarCards(mediaGeral) {
    listaAcimaMedia.innerHTML = '';
    listaBaixaFrequencia.innerHTML = '';

    alunos.forEach(aluno => {
        if (aluno.media > mediaGeral) {
            const li = document.createElement('li');
            li.textContent = `${aluno.nome} - Média: ${aluno.media}`;
            listaAcimaMedia.appendChild(li);
        }
        if (aluno.frequencia < 75) {
            const li = document.createElement('li');
            li.textContent = `${aluno.nome} - Frequência: ${aluno.frequencia}%`;
            listaBaixaFrequencia.appendChild(li);
        }
    });
}
