import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';

import { MovieDetails } from 'src/app/interfaces/movies-response';
import { Cast } from 'src/app/interfaces/credits-response';
import { FilmsService } from 'src/app/services/films.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieDetails
  public cast: Cast[] = []

  constructor( private activatedRoute: ActivatedRoute,
               private service: FilmsService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params

    combineLatest([

      this.service.getMovieDetail(id),
      this.service.getCast(id)

    ]).subscribe( ( [movie, cast] ) => {

      if(!movie){
        this.router.navigateByUrl('/home')
        return
      }

      this.movie = movie
      this.cast = cast.filter( actor => actor.profile_path )

    })

  }

  goBack(){
    this.location.back()
  }

}
