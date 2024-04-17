import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {Role} from "@model/emuns/role";
import {PATH_AUTH} from "@config/paths.config";
import {AuthService} from "@service/auth.service";

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrl: './locked.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ]
})
export class LockedComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  userFullName!: string;
  hide = true;
  userImg!: string;
  private userEmail!: string;
  private username!: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.userImg = this.authService.currentUserValue.img;
    this.userEmail = this.authService.currentUserValue.email;
    this.userFullName = this.authService.currentUserValue.firstName + ' ' + this.authService.currentUserValue.lastName;
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    } else {

      this.authService.unlockSession(
        {
          email: this.userEmail ,
          password: this.authForm.get('password')?.value
        }
      ).subscribe(
        () => {
          const role = this.authService.currentUserValue.role;
          if (role === Role.ALL || role === Role.ADMIN) {
            this.router.navigate([`${Role.ADMIN}/dashboard/main`]);
          } else if (role === Role.MONITEUR) {
            this.router.navigate([`${Role.MONITEUR}/dashboard`]);
          } else if (role === Role.CANDIDAT) {
            this.router.navigate([`${Role.CANDIDAT}/dashboard`]);
          } else {
            this.router.navigate([`${PATH_AUTH.signin}`]);
          }
        }
      );
    }
  }
}
