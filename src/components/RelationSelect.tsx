import React, { FC } from 'react';
import { Select, SelectProps } from 'antd';

import { relationMap } from 'utils';
import { TRelation } from 'types/types';

type TSelectOption = {
  value: TRelation;
  label: string;
};

const selectOptions: TSelectOption[] = Object.entries(relationMap).map(([key, value]) => ({
  value: key as TRelation,
  label: value,
}));

export const RelationSelect: FC<SelectProps> = ({ value, onChange, ...props }) => (
  <Select
    {...props}
    value={value}
    defaultValue="mother"
    style={{ width: 120 }}
    onChange={onChange}
    options={selectOptions}
  />
);
