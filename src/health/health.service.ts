import { Service } from '../meta/routing.meta';

@Service()
export class HealthService {
  public ok() {
    return 'ok';
  }
}
