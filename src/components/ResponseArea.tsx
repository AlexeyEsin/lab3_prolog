import React, { FC } from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

type TResponseAreaProps = {
  data: string;
  onClearArea: VoidFunction;
};

export const ResponseArea: FC<TResponseAreaProps> = ({ data, onClearArea }) => {
  return (
    <div className="responseArea">
      <TextArea rows={10} value={data} className="textArea" />
      <Button className="clearButton" type="primary" onClick={onClearArea}>
        Очистить
      </Button>
    </div>
  );
};
