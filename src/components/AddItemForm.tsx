import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';

import { TRelativesTableData } from 'types/types';
import { RelationSelect } from './RelationSelect';

type TAddItemFormProps = {
  onAdd: (data: TRelativesTableData) => void;
};

export const AddItemForm: FC<TAddItemFormProps> = ({ onAdd }) => {
  const [form] = Form.useForm<TRelativesTableData>();

  return (
    <div className="addItemForm">
      <Form form={form} name="addItem" autoComplete="off" onFinish={onAdd} layout="inline">
        <Form.Item name="name">
          <Input placeholder="Кто" />
        </Form.Item>
        <Form.Item name="relation">
          <RelationSelect />
        </Form.Item>
        <Form.Item name="relativeName">
          <Input placeholder="Для кого" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
