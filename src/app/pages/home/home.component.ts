import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = []
  public moviesSlideshow: Movie[] = []


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){

      if(this._pService.cargando) { return }

      this._pService.getCartelera()
        .subscribe(movies => {
          this.movies.push(...movies)
        })
    }

  }

  constructor( private _pService: FilmsService ) { }

  ngOnInit(): void {

    this._pService.getCartelera()
      .subscribe(movies => {
        this.movies = movies;
        this.moviesSlideshow = movies
      })

  }

  ngOnDestroy(): void{
    this._pService.resetCarteleraPage()
  }

}
