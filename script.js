function transcrever() {
    var url = document.getElementById("url").value;
  
    document.getElementById("loader").style.display = "block";
    document.getElementById("texto-transcricao").innerText = "";
  
    fetch('https://us-central1-bruno-test-autenticare.cloudfunctions.net/transcrever-responder/transcrever', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
      .then(response => response.text())
      .then(data => {
        document.getElementById("loader").style.display = "none";
        const transcricaoComTimestamps = adicionarTimestamps(data);
        document.getElementById("texto-transcricao").innerHTML = transcricaoComTimestamps;
      })
      .catch(error => {
        console.error('Erro ao transcrever:', error);
        document.getElementById("loader").style.display = "none";
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
        const respostaFormatada = formatarResposta(data);
        document.getElementById("texto-resposta").innerHTML = respostaFormatada;
      })
      .catch(error => {
        console.error('Erro ao perguntar:', error);
        alert("Ocorreu um erro ao fazer a pergunta. Por favor, tente novamente.");
      });
  }
  
  function adicionarTimestamps(transcricao) {
    // Substitua pela lógica real para adicionar timestamps
    return transcricao.split('\n').map((linha, index) =>
      `<p><a href="#" onclick="seekToTime(${index * 10})">${formatTime(index * 10)}:</a> ${linha}</p>`
    ).join('');
  }
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }
  
  function seekToTime(seconds) {
    // Substitua pela lógica real para simular o "seek"
    alert(`Simulando seek para ${seconds} segundos`);
  }
  
  function formatarResposta(resposta) {
    const paragrafos = resposta.split('\n');
    let htmlFormatado = "";
    for (const paragrafo of paragrafos) {
      const paragrafoLimpo = paragrafo.trim();
      if (isValidUrl(paragrafoLimpo)) {
        htmlFormatado += `<p><a href="${paragrafoLimpo}" target="_blank">${paragrafoLimpo}</a></p>`;
      } else {
        htmlFormatado += `<p>${paragrafoLimpo}</p>`;
      }
    }
    return htmlFormatado;
  }
  
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }