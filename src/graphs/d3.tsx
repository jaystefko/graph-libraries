import { DataPoint, Option } from '../types';
import React from 'react';
// @ts-ignore
import * as d3 from 'd3';

type Props = {
  data: Array<DataPoint>;
  option: Option;
};

const useD3 = (renderChartFn: Function, dependencyList: Array<unknown>) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencyList); // eslint-disable-line

  return ref;
};

function Graph({ data }: Props) {
  const ref = useD3(
    // @ts-ignore
    (svg) => {
      const height = 500;
      const width = 1000;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.timestamp))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d: DataPoint) => d.value_1 || d.value_2)])
        .rangeRound([height - margin.bottom, margin.top]);

      // @ts-ignore
      const xAxis = (g) =>
        g.attr('transform', `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v: unknown) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      // @ts-ignore
      const y1Axis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .style('color', 'steelblue')
          .call(d3.axisLeft(y1).ticks(null, 's'))
          // @ts-ignore
          .call((g) => g.select('.domain').remove())
          .call((g: unknown) =>
            // @ts-ignore
            g
              .append('text')
              .attr('x', -margin.left)
              .attr('y', 10)
              .attr('fill', 'currentColor')
              .attr('text-anchor', 'start')
              // @ts-ignore
              .text(data.y1 || '')
          );

      svg.select('.xAxis').call(xAxis);
      svg.select('.yAxis').call(y1Axis);

      svg
        .select('.area')
        .attr('fill', 'steelblue')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (d: DataPoint) => x(d.timestamp))
        .attr('width', x.bandwidth())
        .attr('y', (d: DataPoint) => y1(d.value_1))
        .attr('height', (d: DataPoint) => y1(0) - y1(d.value_1));
    },
    [data.length]
  );

  return (
    <svg
      // @ts-ignore
      ref={ref}
      style={{
        height: 500,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px',
      }}
    >
      <g className='area' />
      <g className='xAxis' />
      <g className='yAxis' />
    </svg>
  );
}

export default Graph;
