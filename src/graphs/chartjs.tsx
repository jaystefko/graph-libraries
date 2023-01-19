import Chart from 'chart.js/auto';
import { DataPoint, Option } from '../types';
import { useEffect, useRef } from 'react';

import 'chartjs-adapter-date-fns';

type Props = {
  data: Array<DataPoint>;
  option: Option;
};

function Graph({ data, option }: Props) {
  const _graph = useRef(null);

  useEffect(() => {
    if (!(_graph.current && data.length)) return;

    const chart = new Chart(_graph.current, {
      type: 'line',
      data: {
        labels: data.map((x) => x.timestamp),
        datasets: [
          {
            label: 'Value 1',
            data: data.map((x) => x.value_1),
          },
          {
            label: 'Value 2',
            data: data.map((x) => x.value_2),
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: option === 1 ? 'hour' : 'day',
              displayFormats: {
                hour: 'HH:mm',
                day: 'dd.MM',
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [_graph.current, data]); // eslint-disable-line

  return (
    <div className='graphContainer'>
      <canvas id='chartjsGraph' ref={_graph} />
    </div>
  );
}

export default Graph;
