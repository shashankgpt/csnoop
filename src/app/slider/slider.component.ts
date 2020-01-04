import { Component, OnInit } from '@angular/core';
import { UiCarouselColorConfig } from 'ngx-ui-carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  public colorConfigy;

  constructor() { }

  ngOnInit() {
    this.colorConfigy = new UiCarouselColorConfig('white', 'white', 'green');
  }

}
