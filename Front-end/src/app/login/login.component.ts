import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // routelink = "/admin";

  constructor(private route: Router) { }

  navigate(){
    this.route.navigate(['/admin'])
  }

}
