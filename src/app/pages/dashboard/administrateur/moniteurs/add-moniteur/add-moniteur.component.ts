import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatError, MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatDialogClose} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FileUploadComponent} from "@shared/components/file-upload/file-upload.component";
import {MoniteursModel} from "@model/moniteurs.model";
import {MoniteurService} from "@service/moniteur.service";

@Component({
  selector: 'app-add-moniteur',
  templateUrl: './add-moniteur.component.html',
  styleUrl: './add-moniteur.component.scss',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadComponent,
    MatButtonModule,
    MatIcon,
  ]
})
export class AddMoniteurComponent {
  proForm!: UntypedFormGroup;
  moniteur!: MoniteursModel;
  breadscrums = [
    {
      title: 'Administrateur',
      items: ['Moniteurs'],
      active: 'Ajouter un moniteur',
    },
  ];


  constructor(
    private fb: UntypedFormBuilder,
    public moniteurService: MoniteurService,
  ) {
    this.proForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      // moniteurId: [this.moniteur.moniteurId],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      email: [
        '',
        [
          Validators.required, Validators.email,
          Validators.minLength(5)
        ]
      ],
      telephone: ['', Validators.required],
      ville: ['', ],
      adresse: ['', Validators.required],
      typeMoniteur: [''],
      dateJointures: [''],
      salaire: [''],
      dateNaissance: [''],
    });
  }


  onSubmit() {
    this.moniteurService.addMoniteur(this.proForm.getRawValue())

  }

  onNoClick() {

  }

  confirmAdd() {

  }
}
