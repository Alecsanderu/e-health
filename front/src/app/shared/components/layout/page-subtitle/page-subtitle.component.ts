import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-subtitle',
  templateUrl: './page-subtitle.component.html',
  styleUrls: [ './page-subtitle.component.scss']
})
export class PageSubtitleComponent implements OnInit {
  @Input()
  text!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
