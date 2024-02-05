import { Service } from 'typedi';

@Service()
export class HealthService {
  public ok() {
    return 'ok';
  }
}
