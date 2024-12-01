function transcrever() {
    // Obter a URL do vídeo do elemento de entrada
    var url = document.getElementById("url").value;
  
    // Exibir o loader e limpar a transcrição anterior
    document.getElementById("loader").style.display = "block";
    document.getElementById("texto-transcricao").innerText = "";
  
    // Fazer a requisição para a API para transcrever o vídeo
    fetch('https://us-central1-bruno-test-autenticare.cloudfunctions.net/transcrever-responder/transcrever', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
      .then(response => response.text())
      .then(data => {
        // Esconder o loader e exibir a transcrição com timestamps
        document.getElementById("loader").style.display = "none";
        const transcricaoComTimestamps = adicionarTimestamps(data);
        document.getElementById("texto-transcricao").innerHTML = transcricaoComTimestamps;
      })
      .catch(error => {
        // Esconder o loader e exibir mensagem de erro em caso de falha
        console.error('Erro ao transcrever:', error);
        document.getElementById("loader").style.display = "none";
        alert("Ocorreu um erro ao transcrever o vídeo. Por favor, tente novamente.");
      });
  }
  
  // Função para fazer uma pergunta sobre o vídeo
  function perguntar() {
    // Obter a URL do vídeo e a pergunta dos elementos de entrada
    var url = document.getElementById("url").value;
    var pergunta = document.getElementById("pergunta").value;
  
    // Fazer a requisição para a API para responder à pergunta
    fetch('https://us-central1-bruno-test-autenticare.cloudfunctions.net/transcrever-responder/perguntar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url, pergunta: pergunta })
    })
      .then(response => response.text())
      .then(data => {
        // Exibir a resposta e destacar a resposta na transcrição (implementar lógica aqui)
        document.getElementById("texto-resposta").innerText = data;
        // ...
      })
      .catch(error => {
        // Exibir mensagem de erro em caso de falha
        console.error('Erro ao perguntar:', error);
        alert("Ocorreu um erro ao fazer a pergunta. Por favor, tente novamente.");
      });
  }
  
  // Função auxiliar para adicionar timestamps à transcrição (implementar lógica aqui)
  function adicionarTimestamps(transcricao) {
    // ... (lógica para processar a transcrição e adicionar timestamps) ...
    // Exemplo (substitua pela lógica real):
    return transcricao.split('\n').map((linha, index) =>
      `<p><a href="#" onclick="seekToTime(${index * 10})">${formatTime(index * 10)}:</a> ${linha}</p>`
    ).join('');
  }
  
  // Função auxiliar para formatar o tempo em minutos e segundos
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }
  
  // Função auxiliar para simular a ação de "seek" no vídeo (substitua pela lógica real)
  function seekToTime(seconds) {
    // ... (lógica para levar o usuário para o tempo especificado no vídeo) ...
    // Exemplo:
    alert(`Simulando seek para ${seconds} segundos`);
  }