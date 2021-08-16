import i18n from '../../i18n';
import data from '../../dataProvider';

export default function renderChart(parent) {
  const loadingText = document.createElement('span');
  parent.appendChild(loadingText);

  const chartInfo = document.createElement('p');
  parent.appendChild(chartInfo);

  data.loadingStream.subscribe({
    next: (loading) => {
      if (loading) {
        loadingText.innerText = i18n.t('loading');
      } else {
        loadingText.innerText = i18n.t('loaded');
      }
      console.log(data);
    },
  });

  data.dataStream.subscribe({
    next: (data) => {
      if (data) {
        chartInfo.innerText = `Data available for processing: ${data.length}`;
      }
    },
  });
}
