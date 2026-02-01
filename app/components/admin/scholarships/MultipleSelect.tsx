import React from 'react';
import { Flex, Select } from 'antd';

const MultipleSelect: React.FC = () => (
  <Flex gap={12} vertical>
    <Flex gap={9}>

      <Select
        mode="multiple"
        defaultValue={['lucy']}
        placeholder="Outlined"
        size='large'

        style={{ flex: 1,borderRadius: '4px' }}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
        ]}
      />
    </Flex>
  </Flex>
);

export default MultipleSelect;
