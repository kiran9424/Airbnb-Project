import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formsData: any = {};
  errors: any[] = [];
  constructor(private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.formsData).subscribe(
      () => {
        this.route.navigate(['/login', { registered: 'success' }]);

      }, (errorResponse) => {
        
        this.errors = errorResponse.error.errors;

      });

  }
}
