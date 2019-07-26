import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {

@Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
