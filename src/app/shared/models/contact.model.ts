import { Country } from './country.model';

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  country: Country;
}
