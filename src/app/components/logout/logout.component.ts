import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor (
    private authService: AuthService,
    private cookieService: CookieService,
    private route: Router
  ) {}

  async ngOnInit () {
    await this.authService.logout().subscribe();
    await this.cookieService.delete("SESSION");
    this.route.navigateByUrl('/login');
  }
}
