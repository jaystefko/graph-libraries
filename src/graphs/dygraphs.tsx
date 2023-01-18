import { DataPoint } from '../types';

type Props = {
  data: Array<DataPoint>;
};

function Graph({ data }: Props) {
  return <div>{`dygraph graph with ${data.length} of data`}</div>;
}

export default Graph;
