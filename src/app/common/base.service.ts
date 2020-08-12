import { environment } from '~template/src/environments/environment';

export abstract class BaseService {

  public host: string;
  public readonly token: string;

  constructor() {
    this.host = environment.firebase.url;
    this.token = environment.firebase.api_key;
  }

}
