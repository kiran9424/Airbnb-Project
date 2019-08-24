import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors: [] = [];
  loginForm: FormGroup;
  notifyMessage = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.activeRoute.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.notifyMessage = 'successfully registered';
      }
    })
  }


  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isValidForm(field): boolean {
    return this.loginForm.controls[field].invalid && (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched);
  }

  isRequired(field): boolean {
    return this.loginForm.controls[field].errors.required;
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (token) => {
        console.log(token);
        this.router.navigate(['/rentals']);

      }, (errorResponse) => {
        this.errors = errorResponse.error.errors;
      });


  }
}
