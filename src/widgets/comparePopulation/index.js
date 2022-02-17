import React from 'react';
import dataProvider from '../../dataProvider';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { map } from 'rxjs';
import i18n from '../../i18n';


// imported data sorting functions defined in chart component
import { __test__ as chartFunc } from '../chart';


const baseOptions = {
  chart: {
    type: 'column',
  },
  // i18n didn't work here so I put it inside useEffect
  
  // title: {
  //   text: i18n.t('compare-title'),
  // },
  // series: [
  //   {
  //     data: [
  //       [2000, 1],
  //       [2001, 10],
  //       [2002, 15],
  //       [2003, 20],
  //       [2005, 23],
  //     ],
  //   },
  //   {
  //     data: [
  //       [2000, 2],
  //       [2001, 5],
  //       [2002, 8],
  //       [2003, 14],
  //       [2005, 32],
  //     ],
  //   },
  // ],
  
};

export default function ComparePopulation() {
  const [loading, setLoading] = React.useState();
  const [chartOptions, setChartOptions] = React.useState(baseOptions);
  const [compareSelection, setCompareSelection] = React.useState();

  useEffect(() => {
    const subscription = dataProvider.comparisonCityStream.subscribe(setCompareSelection);
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const subscription = dataProvider.loadingStream.subscribe(setLoading);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // I got an infinite loop when I tried to declare this function in global scope,
    // so I put it here

    // merges data arrays
    const getColumnData = (data) => {
      const populationArray = chartFunc.getPopulation(data);
      const estimatedArray = chartFunc.getEstimatedPopulation(data);
      return populationArray.concat(estimatedArray);
    };

    const subscription = dataProvider.dataForComparisonCity
      .pipe(
        map((data) => {
          return {
            ...baseOptions,
            title: {
              text: i18n.t('compare-title'),
            },
            series: [
              {
                name: data[0][0]?.city,
                data: getColumnData(data[0]),
              },
              {
                name: data[1][0]?.city,
                data: getColumnData(data[1]),
              },
            ],
          };
        })
      )
      .subscribe(setChartOptions);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {compareSelection && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </div>
  );
}
