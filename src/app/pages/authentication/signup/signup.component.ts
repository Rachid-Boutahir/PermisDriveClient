import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {
  UntypedFormBuilder, UntypedFormGroup,
  Validators, FormsModule, ReactiveFormsModule
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {AuthService} from "@service/auth.service";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatOption,
    MatSelect,
  ]
})
export class SignupComponent implements OnInit {

  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  returnUrl!: string;
  hide = true;
  chide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5)
        ]
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      // Disable the form
      this.authForm.disable();
      this.authService.signUp(this.authForm.value).subscribe(
        (response) => {
          if (response) {
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/confirmation-required']);
            }, 1000);
          } else {
          }
        },
        (error) => {
          // Re-enable the form
          this.authForm.enable();
          this.authForm.reset();
          this.loading = false;
        }
      )
    }
  }

}
