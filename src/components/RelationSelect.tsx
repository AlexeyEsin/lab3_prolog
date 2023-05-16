import React, { FC } from 'react';
import { Select, SelectProps } from 'antd';

import { realtionMap } from 'utils';
import { TRelation } from 'types/types';

type TSelectOption = {
  value: TRelation;
  label: string;
};

const selectOptions: TSelectOption[] = Object.entries(realtionMap).map(([key, value]) => ({
  value: key as TRelation,
  label: value,
}));

type TRelationSelectProps = {
  value?: TRelation;
  onChange?: (newValue: TRelation) => void;
};

export const RelationSelect: FC<TRelationSelectProps & SelectProps> = ({ onChange, value, ...props }) => {
  return (
    <Select
      {...props}
      value={value}
      defaultValue="mother"
      style={{ width: 120 }}
      onChange={onChange}
      options={selectOptions}
    />
  );
};
