document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const resultArtist = document.getElementById("result-artist");
    const resultPlaylist = document.querySelector('.result-playlists');
    const greetingElement = document.querySelector('.boas__vindas');
    const artistsSection = document.getElementById('artists-section');

    function requestApi(searchTerm) {
        const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
        fetch(url)
            .then(response => response.json())
            .then(result => displayResults(result));
    }

    function displayResults(result) {
        resultPlaylist.classList.add("hidden");
        artistsSection.innerHTML = '';  // Clear previous results

        result.forEach(element => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist-card');
            
            artistCard.innerHTML = `
                <div class="card-img">
                    <img src="${element.urlImg}" alt="${element.name}" class="artist-img" />
                    <div class="play">
                        <span class="fa fa-solid fa-play"></span>
                    </div>
                </div>
                <div class="card-text">
                    <a title="${element.name}" class="vst" href=""></a>
                    <span class="artist-name">${element.name}</span>
                    <span class="artist-categorie">Artista</span>
                </div>
            `;
            
            artistsSection.appendChild(artistCard);
        });

        resultArtist.classList.remove('hidden');
        artistsSection.classList.remove('hidden');
        setGreeting();
    }

    document.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            resultPlaylist.classList.remove('hidden');
            resultArtist.classList.add('hidden');
            artistsSection.classList.add('hidden');
            return;
        }
        requestApi(searchTerm);
    });

    function setGreeting() {
        const now = new Date();
        const currentHour = now.getHours();

        let greeting;
        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Bom dia';
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = 'Boa tarde';
        } else {
            greeting = 'Boa noite';
        }

        greetingElement.innerText = greeting;
    }

    setGreeting();
});
