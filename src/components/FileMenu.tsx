import React, { FC } from 'react';
import { Button, Typography, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';

type TFileMenuProps = {
  onFileLoad: (data: string) => void;
  onSave: VoidFunction;
};

export const FileMenu: FC<TFileMenuProps> = ({ onFileLoad, onSave }) => {
  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = (e) => onFileLoad((e.target?.result as string) ?? null);
    reader.readAsText(file);
    return false;
  };

  return (
    <div className="fileMenu">
      <Typography.Title level={4}>Меню файла</Typography.Title>
      <div className="buttons">
        <Upload name="file" accept=".pl" beforeUpload={beforeUpload} maxCount={1}>
          <Button type="primary">Открыть</Button>
        </Upload>
        <Button type="primary" onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
