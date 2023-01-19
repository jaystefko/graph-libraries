import { DataPoint, Option } from '../types';

type Props = {
  data: Array<DataPoint>;
  option: Option;
};

function Graph({ data, option }: Props) {
  return <div className='graphContainer'>{`dygraph graph with ${data.length} of data`}</div>;
}

export default Graph;
