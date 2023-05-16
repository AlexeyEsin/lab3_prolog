import React, { FC, useState } from 'react';
import { Button, Typography, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';

type TFileMenuProps = {
  onFileLoad: (name: string, data: string) => void;
  onSave: VoidFunction;
  onRemove: VoidFunction;
  isSaveDisabled: boolean;
};

export const FileMenu: FC<TFileMenuProps> = ({ onFileLoad, onSave, onRemove, isSaveDisabled }) => {
  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = (e) => onFileLoad(file.name, (e.target?.result as string) ?? null);
    reader.readAsText(file);
    return false;
  };

  return (
    <div className="fileMenu">
      <Typography.Title level={4}>Меню файла</Typography.Title>
      <div className="buttons">
        <Upload name="file" accept=".pl" beforeUpload={beforeUpload} maxCount={1} onRemove={onRemove}>
          <Button type="primary">Открыть</Button>
        </Upload>
        <Button type="primary" onClick={onSave} disabled={isSaveDisabled}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
