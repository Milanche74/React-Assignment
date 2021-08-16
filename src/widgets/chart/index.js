import React from 'react';
import i18n from '../../i18n';
import dataProvider from '../../dataProvider';
import { useEffect } from 'react';
import { filter } from 'rxjs';
import { negate, isUndefined } from 'lodash/fp';

export default function Chart() {
  const [loading, setLoading] = React.useState();
  const [data, setData] = React.useState();

  useEffect(() => {
    const subscription = dataProvider.loadingStream.subscribe(setLoading);
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const subscription = dataProvider.dataStream
      .pipe(filter(negate(isUndefined)))
      .subscribe(setData);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <div>{loading ? i18n.t('loading') : i18n.t('loaded')}</div>
      {!loading && <div>Data available for processing: {data?.length}</div>}
    </div>
  );
}
