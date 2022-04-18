import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  ASSISTANCE_URL = environment.ASSISTANCE_URL;
  MENTIONS_LEGALES_URL = environment.MENTIONS_LEGALES_URL;
  AIDE_URL = environment.AIDE_URL;

  constructor() { }

  ngOnInit() {
  }

}
