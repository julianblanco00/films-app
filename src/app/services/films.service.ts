import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response'
import { Cast, CreditsResponse } from '../interfaces/credits-response';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { MovieDetails } from '../interfaces/movies-response';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private baseUrl:string = 'https://api.themoviedb.org/3'
  private carteleraPage = 1

  public cargando: boolean = false

  constructor( private http: HttpClient) { }

  get params(){
    return {
      api_key: 'c2cc4fcec9b0f31b1a4d74cc89ff31be',
      language: 'en-US',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1
  }

  getCartelera(): Observable<Movie[]>{

    if(this.cargando){
      return of([]);
    }

    this.cargando = true

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing?`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results),
      tap( () => {
        this.carteleraPage += 1
        this.cargando = false
      })
    );
  
  }

  searchFilm( text:string ):Observable<Movie[]>{

    const params = {...this.params, page: '1', query: text};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map( res => res.results )
    )

  }

  getMovieDetail( id:string ){
    
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )

  }

  getCast( id:string ):Observable<Cast[]>{
    
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]))
    )

  }

}
