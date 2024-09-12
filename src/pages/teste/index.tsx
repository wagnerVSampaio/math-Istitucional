import React from 'react';
import { Select } from 'antd/lib';

const App: React.FC = () => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="label"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'Santarém (campus sede)',
      },
      {
        value: '2',
        label: 'Campus Alenquer',
      },
      {
        value: '3',
        label: 'Campus Itaituba',
      },
      {
        value: '4',
        label: 'Campus Monte Alegre',
      },
      {
        value: '5',
        label: 'Campus Juruti',
      },
      {
        value: '6',
        label: 'Campus Óbidos',
      },
      {
        value: '7',
        label: 'Campus Oriximiná',
      },
    ]}
  />
);

export default App;