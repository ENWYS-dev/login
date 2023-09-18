import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  loginC = false;
  redirectC = false;

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        if(data["type"] == "redirect") {
          this.redirectC = true;
        } else {
          this.loginC = true;
        }
      }
    );
  }
}
