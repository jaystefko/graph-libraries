import React, { useState } from 'react';
import { DataPoint, Option } from './types';
import getData from './getData';
import GraphD3 from './graphs/d3';
import GraphChartjs from './graphs/chartjs';
import GraphDygraphs from './graphs/dygraphs';
import GraphReacharts from './graphs/recharts';

function App() {
  const [option, setOption] = useState<Option>(1);
  const [data, setData] = useState<Array<DataPoint>>([]);

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.currentTarget.value) as Option;
    setOption(value);
    setData(getData(value));
  }

  return (
    <article>
      <header>Graph test</header>
      <main>
        <section>
          <p>Which data set would you like to see?</p>
          <p>{`Selected right now: ${option}`}</p>
          <select onChange={onSelectChange}>
            <option value={1}>Day</option>
            <option value={2}>Week</option>
            <option value={3}>Month</option>
          </select>
        </section>
        <section>
          <div>
            <GraphD3 data={data} />
          </div>
          <div>
            <GraphChartjs data={data} />
          </div>
          <div>
            <GraphDygraphs data={data} />
          </div>
          <div>
            <GraphReacharts data={data} />
          </div>
        </section>
      </main>
    </article>
  );
}

export default App;
