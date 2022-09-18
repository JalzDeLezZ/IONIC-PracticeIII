/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, PeliculaDetalle, ResponseMDB, RespuestaCredits } from '../interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  generos: Genre[] = [];
  private pagePopular = 0;

  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getNotorious() {
    this.pagePopular++;
    const query = `/discover/movie?sort_by=popularity.desc?page=${this.pagePopular}`;
    return this.ejecutarQuery<ResponseMDB>(query);
  }

  getFeature() {
    const today = new Date();
    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const month = today.getMonth() + 1;
    let mesString;

    if (month < 10) {
      mesString = '0' + month;
    } else {
      mesString = month;
    }

    const dateInit = `${today.getFullYear()}-${mesString}-01`;
    const lastDate = `${today.getFullYear()}-${mesString}-${lastDay}`;

    return this.ejecutarQuery<ResponseMDB>(
      `/discover/movie?primary_release_date.gte=${dateInit}&primary_release_date.lte=${lastDate}`
    );
  }

  searchMovies(text: string) {
    return this.ejecutarQuery<ResponseMDB>(`/search/movie?query=${text}`);
  }

  getDetailMovie(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActors(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  uploadGenres(): Promise<Genre[]> {
    return new Promise((resolve) => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp) => {
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });
    });
  }
}
