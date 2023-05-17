import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';

import { TQueryForm } from 'types/types';

type TQueryFormProps = {
  onSendQuery: (query: string) => void;
};

export const QueryForm: FC<TQueryFormProps> = ({ onSendQuery }) => {
  const [form] = Form.useForm<TQueryForm>();
  const query = Form.useWatch('query', form);

  const grandfathersQuery = 'is_grandfather(X, "сергей_иванов").';
  const relativesQuery = 'is_relative("роман_соловьёв", "илья_иванов").';
  const spousesQuery = 'is_spouse("алексей_сидоров", "дарья_сидорова").';

  return (
    <div className="queryForm">
      <Form form={form} name="queryForm" autoComplete="off" onFinish={() => onSendQuery(query)}>
        <Form.Item>
          <Button type="primary" onClick={() => onSendQuery(grandfathersQuery)}>
            Найти всех дедушек Сергея Иванова
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => onSendQuery(relativesQuery)}>
            Являются ли Роман Соловьёв и Николай Иванов родственниками?
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => onSendQuery(spousesQuery)}>
            Являются ли Алексей Сидоров и Дарья Сидорова супругами?
          </Button>
        </Form.Item>
        <div className="customQuery">
          <Form.Item name="query" className="input">
            <Input placeholder="Введите запрос на Prolog" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
