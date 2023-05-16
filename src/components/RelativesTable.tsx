import React, { FC, useState } from 'react';
import { Button, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { TRelation, TRelativesTableData } from 'types/types';
import { RelationSelect } from 'components/RelationSelect';

type TRelativesTableProps = {
  data: TRelativesTableData[];
  onChangeName: (key: string, newValue: string) => void;
  onChangeRelativeName: (key: string, newValue: string) => void;
  onChangeRelation: (key: string, newValue: TRelation) => void;
  onDeleteItems: (keys: React.Key[]) => void;
};

export const RelativesTable: FC<TRelativesTableProps> = ({
  data,
  onChangeName,
  onChangeRelativeName,
  onChangeRelation,
  onDeleteItems,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newKeys: React.Key[]) => setSelectedRowKeys(newKeys),
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<TRelativesTableData> = [
    {
      title: 'Кто',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Input value={record.name} onChange={(e) => onChangeName(record.key, e.target.value)} autoComplete="off" />
      ),
    },
    {
      title: 'Кем является',
      dataIndex: 'relation',
      key: 'relation',
      sorter: (a, b) => a.relation.localeCompare(b.relation),
      render: (text, record) => (
        <RelationSelect value={record.relation} onChange={(value) => onChangeRelation(record.key, value)} />
      ),
    },
    {
      title: 'Для кого',
      dataIndex: 'relativeName',
      key: 'relativeName',
      sorter: (a, b) => a.relativeName.localeCompare(b.relativeName),
      render: (text, record) => (
        <Input
          value={record.relativeName}
          onChange={(e) => onChangeRelativeName(record.key, e.target.value)}
          autoComplete="off"
        />
      ),
    },
  ];

  const handleDeleteItems = () => {
    onDeleteItems(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  return (
    <div className="tableContainer">
      <div>
        <Button type="primary" onClick={handleDeleteItems} disabled={!hasSelected}>
          Удалить
        </Button>
        {hasSelected && <span className="selectedItems">Выбрано объектов: {selectedRowKeys.length}</span>}
      </div>

      <Table
        className="relativesTable"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};
