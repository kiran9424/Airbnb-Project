import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,private route:Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/login'])
  }

  search(city:string){
    city ? this.route.navigate([`/rentals/${city}/homes`]): this.route.navigate(['/rentals']);
  }
}
