import { Component } from '@angular/core';

@Component({
    templateUrl: 'data-scientist.component.html',
    styleUrls: [ 'data-scientist.compoent.css' ]
})
export class DataScientistComponent {
  title = 'app';
  messageShown = false;

  toggleMessageDisply(): void {
    if (this.messageShown) {
      document.getElementById('message').style.display = 'none';
      this.messageShown = false;
    } else {
      document.getElementById('message').style.display = 'block';
      this.messageShown = true;
    }
  }
}
