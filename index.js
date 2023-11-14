function obterCidade() {
    const cidade = document.getElementById("cidadeInput").value;
    const api_key = "5c390847b31e1711b93a657e0371c0e1"; 
    const lang = "pt_BR";
    const units = "metric";

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&units=${units}&appid=${api_key}&lang=${lang}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 0) {
        // para extrarir latitude e longitude
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        // as linha a baixo foram colocadas para comparação, deixei elas para poder estudar depois, por favor ignores elas
        // para poder pegar no html e exibir
        // const latitudeOutput = document.getElementById("latitudeOutput");
        // const longitudeOutput = document.getElementById("longitudeOutput");

        // subtituindo os valores pelos obtidos
        // latitudeOutput.value = `Latitude: ${latitude}`;
        // longitudeOutput.value = `Longitude: ${longitude}`;
        
        //mudando o conteúdo dos textos
        document.getElementById("latitudeOutput").textContent = latitude;
        document.getElementById("longitudeOutput").textContent = longitude;
        
        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=${units}&lang=${lang}`;

        fetch(url2)
            .then(response => response.json())
            .then(data => {
            const sensacao_termica = data.main.feels_like;
            const descricao = data.weather[0].description;
            document.getElementById("sensacaoOutput").textContent = sensacao_termica;
            document.getElementById("descricaoOutput").textContent = descricao;
            })
            .catch(error => console.error(error));
        } else {
        alert("Cidade não encontrada.");
        }
    })
    .catch(error => console.error(error));
};

