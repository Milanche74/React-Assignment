import React from 'react';
import dataProvider from '../../dataProvider';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const baseOptions = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Compare City1 and City2 population',
  },
  series: [
    {
      data: [
        [2000, 1],
        [2001, 10],
        [2002, 15],
        [2003, 20],
        [2005, 23],
      ],
    },
    {
      data: [
        [2000, 2],
        [2001, 5],
        [2002, 8],
        [2003, 14],
        [2005, 32],
      ],
    },
  ],
};

export default function ComparePop() {
  const [loading, setLoading] = React.useState();

  useEffect(() => {
    const subscription = dataProvider.loadingStream.subscribe(setLoading);
    return () => subscription.unsubscribe();
  }, []);

  return <div>{!loading && <HighchartsReact highcharts={Highcharts} options={baseOptions} />}</div>;
}
