import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  // trigger-variable for Ladda
  isLoggingOut: boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
  }

  onLoggingOut() {
    this.isLoggingOut = true;

    this.authenticationService.logout()
  }
}