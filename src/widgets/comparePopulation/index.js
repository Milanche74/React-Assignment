import React from 'react';
import dataProvider from '../../dataProvider';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { map } from 'rxjs';
import { flow, map as lmap, reject, get, isNil} from 'lodash/fp';


const baseOptions = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Compare City1 and City2 population',
  },
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
  series: []
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
    const getColumnData = flow(
      reject(flow(get('population'), isNil)),
      lmap(({year, population})=> [year, population])
    )
    const subscription = dataProvider.dataForComparisonCity
    .pipe(
      map((data)=> {
        return {
          ...baseOptions,
          series: [
            {
              name: data[0][0]?.city,
              data: getColumnData(data[0])
            },
            {
              name: data[1][0]?.city,
              data: getColumnData(data[1])
            }
          ]
        }
      })
    ).subscribe(setChartOptions);
    return () => subscription.unsubscribe()
  },[]);


  return <div>{compareSelection && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}</div>;
}
