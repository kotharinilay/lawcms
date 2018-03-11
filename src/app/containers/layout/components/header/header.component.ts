import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleSidebarClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSidebarOpen: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.isSidebarOpen = false;
  }

  ngOnInit() {
  }

  toggleSidebar() {
    this.toggleSidebarClick.emit(!this.isSidebarOpen);
  }

  logout() {
    this.authService.setAuhToken('');
    this.router.navigate(['/login']);
  }
}
