<template>
  <div id="app">
    <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Movie Search</a>
      </nav>
</header>

<main class="container mt-2">
  <form @submit.prevent="getResults">
      <div class="form-group">
          <label for="searchTerm">Search</label>
          <input v-model="searchTerm" id="searchTerm" class="form-control" type="text"
          name="" placeholder="Enter a movie title.">
      </div>
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">GO</button>
  </form>
   <section>
      <section class="row movies-area">
        <section class="mt-2 col-9 row" id="results">

          <div v-if="error" class="alert alert-danger col" role="alert">
            {{error}}
          </div>
          <div class="card col-4 pt-3"
          v-for="movie in results" v-bind:key="movie" style="width: 18rem;">
        <img class="card-img-top" :src="movie.Poster" :alt="movie.Title">
        <div class="card-body">
            <h5 class="card-title">{{movie.Title}}</h5>
            <p class="card-text">{{movie.Year}}</p>
                <button @click="addTowatchLater(movie)"
                 type="button" class="btn btn-primary">
                  Watch later</button>

            </div>
        </div>
        </section>
        <section class="mt-2 col-3 row">
            <h3>Watch Later</h3>
            <section class="row" id="watch-later">
              <div class="card col-12 pt-3"
              v-for="movie in watchLater" v-bind:key="movie" style="width: 18rem;">
              <img class="card-img-top" :src="movie.Poster" :alt="movie.Title">
              <div class="card-body">
                <h5 class="card-title">{{movie.Title}}</h5>
                <p class="card-text">{{movie.Year}}</p>
              </div>
          </div>
            </section>
        </section>
      </section>
    </section>
  </main>
  </div>
</template>

<script>
const API_URL = 'https://omdb-api.now.sh/?type=movie&s=';

export default {
  name: 'app',
  data: () => ({
    error: '',
    searchTerm: '',
    results: [],
    watchLater: [],
  }),
  methods: {
    async getResults() {
      const url = `${API_URL}${this.searchTerm}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Error) {
        this.results = [];
        this.error = data.Error;
      } else {
        this.results = data.Search;
        this.error = '';
      }
    },
    addTowatchLater(movie) {
      this.watchLater.push(movie);
    },
  },
};
</script>

<style>
    .movies-area{
          justify-content: space-around;
          align-items: flex-start;
    }
    </style>
