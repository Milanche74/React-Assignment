import { BehaviorSubject } from 'rxjs';
import csv from '../../data/city-populations-to-2035.csv';

const loading = new BehaviorSubject(true);
const data = new BehaviorSubject();

(async function init() {
  setTimeout(() => {
    loading.next(false);
    data.next(csv);
  }, 3000); // Simulate network request
})();

export default {
  loadingStream: loading,
  dataStream: data,
};
