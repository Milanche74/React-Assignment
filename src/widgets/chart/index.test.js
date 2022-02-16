
import { __test__ } from './index';

describe('Chart', () => {
  describe('getPopulation', () => {
    it('should handle empty', () => {
      const result = __test__.getPopulation([]);
      expect(result).toEqual([]);
    });

    it('should filter out empty population data', () => {
      const result = __test__.getPopulation([
        { year: '2012', city: 'A', population: 10 },
        { year: '2013', city: 'A', population: 15 },
        { year: '2012', city: 'B', population: null },
        { year: '2012', city: 'C' },
        { year: '2014', city: 'B', population: 0 },
      ]);
      expect(result).toMatchSnapshot();
    });
  });

  describe('getEstimatedPopulation', () => {
    it('should extract values of projected population only', () => {
      const result = __test__.getEstimatedPopulation([
        { year: '2025', city: 'A', projected: 10 },
        { year: '2030', city: 'A', projected: 15 },
        { year: '2012', city: 'B', population: 1 },
        { year: '2012', city: 'C' },
        { year: '2035', city: 'B', projected: 0 },
      ]);
      expect(result).toMatchSnapshot();
    });
  });
});
