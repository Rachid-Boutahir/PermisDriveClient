import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MoniteursModel} from "@model/moniteurs.model";
import {MoniteurService} from "@service/moniteur.service";


export interface DialogData {
  id: number;
  action: string;
  moniteur: MoniteursModel;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogClose,
  ]
})
export class FormDialogComponent {
  action!: string;
  dialogTitle!: string;
  proForm!: UntypedFormGroup;
  moniteur!: MoniteursModel;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public moniteurService: MoniteurService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.moniteur.nom + ' ' + data.moniteur.prenom;
      this.moniteur = data.moniteur;
    } else {
      this.dialogTitle = 'Nouveau Moniteur';
      const blankObject = {} as MoniteursModel;
      this.moniteur = new MoniteursModel(blankObject);
    }
    this.proForm = this.createContactForm();
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      moniteurId: [this.moniteur.moniteurId],
      nom: [this.moniteur.nom, Validators.required],
      prenom: [this.moniteur.prenom, Validators.required],
      sexe: [this.moniteur.sexe, Validators.required],
      email: [
        this.moniteur.email,
        [
          Validators.required, Validators.email,
          Validators.minLength(5)
        ]
      ],
      telephone: [this.moniteur.telephone, Validators.required],
      ville: [this.moniteur.ville, Validators.required],
      adresse: [this.moniteur.adresse, Validators.required],
      typeMoniteur: [this.moniteur.typeMoniteur],
      dateJointures: [this.moniteur.dateJointures],
      salaire: [this.moniteur.salaire],
      dateNaissance: [this.moniteur.dateNaissance],
    });
  }


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.action === 'edit') {
      console.log(this.action);
      this.moniteurService.updateMoniteur(this.proForm.getRawValue())
    } else {
      console.log(this.action);
      this.moniteurService.addMoniteur(this.proForm.getRawValue())
    }
  }


}
