import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  // trigger-variable for Ladda
  isLoggingOut: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoggingOut() {
    this.isLoggingOut = true;
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedin');

    this.router.navigate(['/login']);
  }
}