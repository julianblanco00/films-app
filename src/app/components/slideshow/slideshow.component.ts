import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[]

  public mySwiper: Swiper

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true
    })

  }

  onSlideNext(){
    this.mySwiper.slideNext()
  }

  onSlidePrev(){
    this.mySwiper.slidePrev()
  }

}
