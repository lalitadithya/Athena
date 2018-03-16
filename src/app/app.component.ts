import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  messageShown = true;

  toggleMessageDisply(): void {
    if(this.messageShown) {
      document.getElementById('message').style.display = 'none';
      this.messageShown = false;
    } else {
      document.getElementById('message').style.display = 'block';
      this.messageShown = true;
    }
  }
}
