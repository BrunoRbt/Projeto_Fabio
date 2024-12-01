function transcrever() {
    var url = document.getElementById("url").value;
  
    fetch('https://us-central1-bruno-test-autenticare.cloudfunctions.net/transcrever-responder/transcrever', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("texto-transcricao").innerText = data;
    })
    .catch(error => {
      console.error('Erro ao transcrever:', error);
      // Exibir mensagem de erro na interface (opcional)
      alert("Ocorreu um erro ao transcrever o vídeo. Por favor, tente novamente."); 
    });
  }
  
  function perguntar() {
    var url = document.getElementById("url").value;
    var pergunta = document.getElementById("pergunta").value;
  
    fetch('https://us-central1-bruno-test-autenticare.cloudfunctions.net/transcrever-responder/perguntar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url, pergunta: pergunta })
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("texto-resposta").innerText = data;
    })
    .catch(error => {
      console.error('Erro ao perguntar:', error);
      // Exibir mensagem de erro na interface (opcional)
      alert("Ocorreu um erro ao fazer a pergunta. Por favor, tente novamente.");
    });
  }