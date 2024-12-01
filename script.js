function transcrever() {
    var url = document.getElementById("url").value;
  
    fetch('/transcrever', {
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
      // Exibir mensagem de erro na interface
    });
  }
  
  function perguntar() {
    var url = document.getElementById("url").value;
    var pergunta = document.getElementById("pergunta").value;
  
    fetch('/perguntar', {
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
      // Exibir mensagem de erro na interface
    });
  }