import {TypeMoniteur} from "@model/emuns/TypeMoniteur";
import {personne} from "@model/personne";
import {formatDate} from "@angular/common";


export class MoniteursModel extends personne {
  moniteurId!: number | string;
  typeMoniteur!: TypeMoniteur;
  dateJointures!: string;
  salaire!: number;

  constructor(moniteurs: MoniteursModel) {
    super();
    this.moniteurId = moniteurs.moniteurId || this.getRandomID();
    this.nom = moniteurs.nom || '';
    this.prenom = moniteurs.prenom || '';
    this.sexe = moniteurs.sexe || '';
    this.dateNaissance = moniteurs.dateNaissance;
    this.adresse = moniteurs.adresse || '';
    this.ville = moniteurs.ville || '';
    this.telephone = moniteurs.telephone || '';
    this.email = moniteurs.email || '';
    this.photo = moniteurs.photo || 'assets/images/user/user1.jpg';
    this.typeMoniteur = moniteurs.typeMoniteur || ''
    this.dateJointures = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.salaire = moniteurs.salaire || 0;

  }

  private getRandomID(): number | string {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + '' + S4() * 2;
  }

}
