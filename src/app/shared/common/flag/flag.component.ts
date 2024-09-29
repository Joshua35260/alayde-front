import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CountryService } from '@app/core/services/country.service';


@Component({
  selector: 'app-flag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class FlagComponent implements OnInit {

  countryCode = input<string>('');
  withCountryName = input<boolean>(true);
  countryName = signal<string>('');
  flagClass = signal<string>('');

  // code iso from from 'i18n-iso-countries/langs/fr.json';
    validCountryCodes = new Set([
    "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ",
    "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "BN",
    "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG",
    "CD", "CK", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER",
    "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR",
    "GL", "GD", "GP", "GU", "GT", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID",
    "IR", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV",
    "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ",
    "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC",
    "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH",
    "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "SH", "KN", "LC", "PM", "VC", "WS", "SM", "ST",
    "SA", "SN", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES", "LK", "SD", "SR", "SJ", "SZ",
    "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV",
    "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM",
    "ZW", "AX", "BQ", "CW", "GG", "IM", "JE", "ME", "BL", "MF", "RS", "SX", "SS", "XK"
  ]);
  

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.updateCountryData();
  }

  updateCountryData() {
    const code = this.countryCode();
    if (code) {
      this.countryName.set(this.countryService.getCountryName(code));
      if (this.isValidCountryCode()) {
        this.flagClass.set(`fi fi-${code.toLowerCase()}`);
      } else {
        this.flagClass.set(''); // Pas de classe de drapeau si le code est invalide
      }
    }
  }

  isValidCountryCode(): boolean {
    return this.validCountryCodes.has(this.countryCode());
  }
}
