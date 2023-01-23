import React, { useEffect, useState } from 'react';
import { DataPoint, Option } from './types';
import getData from './getData';
import GraphD3 from './graphs/d3';
import GraphChartjs from './graphs/chartjs';
import GraphReacharts from './graphs/recharts';

function App() {
  const [option, setOption] = useState<Option>(1);
  const [size, setSize] = useState<Option>(1);
  const [data, setData] = useState<Array<DataPoint>>([]);

  useEffect(() => {
    setData(getData(option, size));
  }, []); // eslint-disable-line

  function _setSize(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.currentTarget.value) as Option;
    setSize(value);
    setData(getData(option, value));
  }

  function _setOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.currentTarget.value) as Option;
    setOption(value);
    setData(getData(value, size));
  }

  return (
    <article>
      <header>Graph test</header>
      <main>
        <section>
          <p>Which data set would you like to see?</p>
          <select onChange={_setOption} value={option}>
            <option value={1}>Day</option>
            <option value={2}>Week</option>
            <option value={3}>Month</option>
          </select>

          <p>How big dataset would you like to use?</p>
          <select onChange={_setSize} value={size}>
            <option value={1}>Small</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </section>
        <section>
          <GraphD3 data={data} option={option} />
          <GraphChartjs data={data} option={option} />
          <GraphReacharts data={data} option={option} />
        </section>
      </main>
    </article>
  );
}

export default App;
