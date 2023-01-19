import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DataPoint, Option } from '../types';
import { formatLabel } from '../utils';

type Props = {
  data: Array<DataPoint>;
  option: Option;
};

const Graph = ({ data, option }: Props) => {
  return (
    <div className='graphContainer'>
      <ResponsiveContainer width={1200} height='100%'>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='v1' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='rgba(141, 201, 191, 0.5)' stopOpacity={0.9} />
              <stop offset='95%' stopColor='rgba(141, 201, 191, 0.5)' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='timestamp' tickFormatter={formatLabel.bind(this, option)} />
          <YAxis />
          <CartesianGrid stroke='rgba(0, 0, 0, 0.1)' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='value_1'
            stroke='rgba(80, 162, 148, 1)'
            fillOpacity={1}
            fill='url(#v1)'
          />
          <Area type='monotone' dataKey='value_2' stroke='gray' strokeWidth={2} fillOpacity={0} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
