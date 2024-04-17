import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

import {Role} from "@model/emuns/role";
import {PATH_AUTH} from "@config/paths.config";
import {AuthService} from "@service/auth.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {UnsubscribeOnDestroyAdapter} from "@shared/UnsubscribeOnDestroyAdapter";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelect,
    MatOption,
  ]
})
export class SigninComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Nom d’utilisateur et/ou mot de passe non valides !';
      return;
    } else {
      this.authForm.disable();
      this.subs.sink = this.authService.signIn(this.authForm.value).subscribe({
        next: (response) => {
          if (response) {
            setTimeout(() => {
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
              this.loading = false;
            }, 1000);
          } else {
            this.error = 'connexion non valide';
          }
        },
        error: (error) => {
          // Activer le formulaire
          this.authForm.enable();
          // Réinitialiser le formulaire
          // this.authForm.reset();
          this.error = error;
          this.submitted = false;
          this.loading = false;
        }
      });

    }

  }

}
