import {GENDRE} from "@model/emuns/Gendre";

export class personne {
  nom!: string;
  prenom!: string;
  sexe!: GENDRE;
  dateNaissance!: string;
  adresse!: string;
  ville!: string;
  telephone!: string;
  photo!: string;
  email!: string;
}
