const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection = document.querySelector('#results');

const API_URL = 'https://omdb-api.now.sh/?type=movie&s=';

form.addEventListener('submit', formSubmitted);

async function formSubmitted(event){
    event.preventDefault();
    const searchTerm = input.value;
    try{
        const results = await getResults(searchTerm);
        showResults(results);
    }catch(error){
        console.error(error);
    }
}

async function getResults(searchTerm){
    const url = `${API_URL}${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.Error){
        throw new Error(data.Error);
    }
    return data.Search;
}


function showResults(results){
    resultsSection.innerHTML = results.reduce((html, movie) => {
        return html + `
        <div class="card col-4 pt-3" style="width: 18rem;">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year}</p>
                <button type="button" class="btn btn-primary">Watch later</button>
            </div>
        </div>`;
    },'');
}