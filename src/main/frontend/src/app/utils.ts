import {Observable} from 'rxjs';
import {ReferentielSimple} from './shared/model/ReferentielSimple';
import {map} from 'rxjs/operators';
import {Demande} from './shared/model/Demande';
import {DonneesRegaliennes} from './shared/model/DonneesRegaliennes';
import {DonneesCorrespondance} from './shared/model/DonneesCorrespondance';
import {DonneesSectorielles} from './shared/model/DonneesSectorielles';
import {DatePipe} from '@angular/common';
import {Structure} from './shared/model/Structure';
import {FicheProl} from './shared/model/FicheProl';
import {DemandeType} from './shared/model/DemandeType';

export default class Utils {

  public static readonly datePattern = 'yyyy-MM-dd';

  /**
   *  find the observable of ReferentielSimple by the code property
   * @param code the code criteria of the select item
   * @param obs observable of the input array elements
   */
  static findReferentielSimple(code: string, obs: Observable<ReferentielSimple[]>): Observable<ReferentielSimple> {
    return obs.pipe(
      map((array: ReferentielSimple[]) => {
        return array.find(ref => ref.code === code);
      })
    );
  }

  /**
   *  find the observable of Structure by the id property
   * @param idStructure the idStructure criteria of the select item
   * @param obs observable of the input array elements
   */
  static findStructure(idStructure: string, obs: Observable<Structure[]>): Observable<Structure> {
    return obs.pipe(
      map((array: Structure[]) => array.filter(entity => entity.idStructure === idStructure)
      )
    );
  }

  /**
   * Check if the object is not null and not undefined
   * @param value
   */
  static isNotNull(value): boolean {
    return (value !== null && typeof value !== 'undefined');
  }

  /**
   * Convert the demand json to a Demand class
   * @param the json input demand
   */

  static convertJsonToDemand(demand: Demande, datePipe: DatePipe): Demande {
    const result = demand;
    if (!demand.donneesRegaliennes) {
      result.donneesRegaliennes = new DonneesRegaliennes();
    } else {
      result.donneesRegaliennes.communeNaissance = this.convertJsonToReferentielSimple(demand.donneesRegaliennes.communeNaissance);
      result.donneesRegaliennes.dateDeNaissance = this.formatDate(result.donneesRegaliennes.dateDeNaissance, this.datePattern, datePipe);
    }
    if (!demand.donneesCorrespondance) {
      result.donneesCorrespondance = new DonneesCorrespondance();
    }
    if (!demand.donneesSectorielles) {
      result.donneesSectorielles = new DonneesSectorielles();
    }
    return result;
  }

  /***
   *  create demand from the ficheProl and the sectoriel data
   * @param ficheProl the ficheProl data to convert
   * @param donneesSectorielles can be null
   */
  static convertFicheProlToDemand(ficheProl: FicheProl, donneesSectorielles: DonneesSectorielles, datePipe: DatePipe): Demande {
    const demand = new Demande();
    if (ficheProl) {
      demand.donneesRegaliennes = ficheProl.donneesRegaliennesForm;
      if (!demand.donneesRegaliennes) {
        demand.donneesRegaliennes = new DonneesRegaliennes();
      } else {
        demand.donneesRegaliennes.communeNaissance = Utils.convertJsonToReferentielSimple(demand.donneesRegaliennes.communeNaissance);
        demand.donneesRegaliennes.dateDeNaissance = Utils.formatDate(demand.donneesRegaliennes.dateDeNaissance, this.datePattern, datePipe);
      }
      demand.donneesRegaliennes.idNatps = ficheProl.idNatps;
      demand.idNatps = ficheProl.idNatps;
    }
    demand.donneesCorrespondance = ficheProl.donneesCorrespondanceForm;
    demand.donneesSectorielles = new DonneesSectorielles();
    if (donneesSectorielles) {
      demand.donneesSectorielles.structure = donneesSectorielles.structure;
      demand.donneesSectorielles.fonction = donneesSectorielles.fonction;
      demand.donneesSectorielles.modeExercice = donneesSectorielles.modeExercice;
      demand.donneesSectorielles.dateDebutActivite = donneesSectorielles.dateDebutActivite;
      demand.donneesSectorielles.dateFinActivite = donneesSectorielles.dateFinActivite;
    }
    return demand;
  }

  /***
   *  create demand from the ficheProl and the sectoriel data
   * @param ficheProl the ficheProl data to convert
   * @param donneesSectorielles can be null
   */
  static convertFicheProlToDemandModif(ficheProl: FicheProl, datePipe: DatePipe): Demande {
    const demand = new Demande();
    if (ficheProl) {
      demand.demandeType = new ReferentielSimple(DemandeType.MODIF, '');
      demand.donneesRegaliennes = ficheProl.donneesRegaliennesForm;
      if (!demand.donneesRegaliennes) {
        demand.donneesRegaliennes = new DonneesRegaliennes();
      } else {
        demand.donneesRegaliennes.communeNaissance = Utils.convertJsonToReferentielSimple(demand.donneesRegaliennes.communeNaissance);
        demand.donneesRegaliennes.dateDeNaissance = Utils.formatDate(demand.donneesRegaliennes.dateDeNaissance, this.datePattern, datePipe);
      }
      demand.donneesRegaliennes.idNatps = ficheProl.idNatps;
      demand.idNatps = ficheProl.idNatps;
    }
    demand.donneesCorrespondance = ficheProl.donneesCorrespondanceForm;
    return demand;
  }

  /**
   * Convert the json to a ReferentielSimple class
   * @param the json input
   */
  static convertJsonToReferentielSimple(json): ReferentielSimple {
    let code = '';
    let libelle = '';
    if (json) {
      code = json.code;
      libelle = json.libelle;
    }
    return new ReferentielSimple(code, libelle);
  }

  static formatDate(dateToFormat: Date, pattern: string, datePipe: DatePipe): Date {
    const formattedDate = datePipe.transform(dateToFormat, pattern);
    return new Date(formattedDate);
  }

  /**
   *  find the status of ReferentielSimple by the code property
   * @param code the code criteria of the select item
   * @param list list of the input array elements
   */
  static findReferentielSimpleObjet(code: string, list: ReferentielSimple[]): ReferentielSimple {
    return list.find(ref => ref.code === code);
  }

  /***
   * Compare two string or Structure objects, return 0 if equals, 1 if v1 > v2, -1 otherwise
   * @param v1 could be string or structure
   * @param v2 could be string or structure
   */
  static compare(v1: any, v2: any) {
    if (v1 instanceof Structure && v2 instanceof Structure) {
      return v1.idStructure < v2.idStructure ? -1 : v1.idStructure > v2.idStructure ? 1 : 0;
    } else {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }
  }

  /***
   *  return the demand Type param from the demand type's code
   * @param the code of the demandType
   */

  static getTypeDemandeParam(demandeType: string) {
    let param;
    switch (demandeType) {
      case 'ANNUL':
        param = 'close';
        break;
      case 'AJOUT':
        param = 'add';
        break;
      default:
        param = '';
    }
    return param ? param + 'ExerciseSituation' : '';
  }
}
