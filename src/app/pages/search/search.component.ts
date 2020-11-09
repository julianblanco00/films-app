import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchedValue: string = ''
  public movies: Movie[] = []

  constructor( private activatedRouter: ActivatedRoute,
               private service: FilmsService ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe( params => {

      this.searchedValue = params.texto

      this.service.searchFilm( params.texto )
        .subscribe( movies => {
          this.movies = movies
        })
    })

  }

}
