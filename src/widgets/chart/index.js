import React from 'react';
import i18n from '../../i18n';
import dataProvider from '../../dataProvider';
import { useEffect } from 'react';
import { map } from 'rxjs';
import { flow, map as lmap, reject, get, isNil } from 'lodash/fp';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const baseOptions = {
  title: {
    text: i18n.t('population'),
  },
};

const getPopulation = flow(
  reject(flow(get('population'), isNil)),
  lmap(({ year, population }) => [year, population])
);

export default function Chart() {
  const [loading, setLoading] = React.useState();
  const [chartOptions, setChartOptions] = React.useState();

  useEffect(() => {
    const subscription = dataProvider.loadingStream.subscribe(setLoading);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = dataProvider.populationForSelectedCity
      .pipe(
        map((data) => {
          return {
            ...baseOptions,
            series: [
              {
                name: i18n.t('population'),
                data: getPopulation(data),
              },
              {
                name: 'Projected',
                // data: getEstimatedPopulation(data),
              },
            ],
          };
        })
      )
      .subscribe(setChartOptions);
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const subscription = dataProvider.selectedCityStream.subscribe((data) => {
      console.log(data);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <div>{loading ? i18n.t('loading') : i18n.t('loaded')}</div>
      {!loading && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </div>
  );
}

export const __test__ = {
  getPopulation,
};
