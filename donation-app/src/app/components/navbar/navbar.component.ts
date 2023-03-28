import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoLogin(): void {
    this.router.navigate(['login']);
  }

  gotoSignUP(): void {
    this.router.navigate(['signup']);
  }

  gotoDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
