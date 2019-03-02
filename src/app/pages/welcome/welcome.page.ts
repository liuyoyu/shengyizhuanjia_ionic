import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavController, Slides} from '@ionic/angular';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {StartAppService} from "../../services/start-app.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {

    showSkip = false;
    @ViewChild('slides') slides: Slides;
  // constructor() { }

  ngOnInit() {
  }
    onSlideWillChange(event) {
        event.target.isEnd().then((end) => {
            this.showSkip = !end;
        });
    }
    constructor(private localStorageService: LocalStorageService, private router: Router,
                private navCtrl: NavController, private startApp: StartAppService) {}

    skip() {
        this.slides.slideTo(3, 500);
    }
}
