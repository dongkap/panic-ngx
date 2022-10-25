import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'do-404',
  styleUrls: ['./404.component.scss'],
  templateUrl: './404.component.html',
})
export class PageNotFoundComponent {

  constructor(private router: Router) {
  }

  goToHome() {
    this.router.navigate(['/app/home']);
    return;
  }
}
