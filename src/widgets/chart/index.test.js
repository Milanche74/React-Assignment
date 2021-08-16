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
});
