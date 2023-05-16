import React, { useEffect, useState } from 'react';
import { Layout, Typography, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import FileSaver from 'file-saver';

import { TRelation, TRelativesTableData } from 'types/types';
import { FileMenu } from 'components/FileMenu';
import { RelativesTable } from 'components/RelativesTable';
import { ResponseArea } from 'components/ResponseArea';
import { AddItemForm } from 'components/AddItemForm';
import { RULES_STRING, dataToProlog, prologToData } from 'utils';
import { QueryForm } from 'components/RequestForm';

const pl = require('tau-prolog');

const { Content } = Layout;

export const App = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [tableData, setTableData] = useState<TRelativesTableData[]>([]);
  const [restFileData, setRestFileData] = useState('');
  const [responseData, setResponseData] = useState<string>('');
  const [session, setSession] = useState<any>();

  useEffect(() => {
    const prologSession = pl.create();
    setSession(prologSession);
  }, []);

  const showError = (error: Error, message: string) => {
    messageApi.open({ type: 'error', content: message });
    console.error(error);
  };

  const showAnswer = (answer: string | false) => {
    let formattedData = session.format_answer(answer).replaceAll(',', '');

    if (formattedData.startsWith('uncaught exception')) {
      showError(new Error(formattedData), 'Произошла ошибка при запросе');
      formattedData = 'Произошла ошибка при запросе';
    }

    setResponseData((prev) => {
      if (prev !== '') {
        if (answer === false) {
          return prev;
        }
        return [prev, formattedData].join('\r\n');
      }
      return formattedData;
    });
  };

  const convertDataToProlog = () => {
    let newFileData = '';
    tableData.forEach((item) => (newFileData += `${dataToProlog(item)}\r\n`));
    newFileData += `\r\n${restFileData}`;

    return newFileData;
  };

  const consultPrologSession = (prologFileData: string) => {
    session.consult(prologFileData, {
      error: (error: Error) => showError(error, 'Не удалось инициализировать сессию Prolog'),
    });
  };

  const handleChangeName = (key: string, name: string) => {
    setTableData((prev) => prev.map((item) => (item.key === key ? { ...item, name } : item)));
  };

  const handleChangeRelativeName = (key: string, relativeName: string) => {
    setTableData((prev) => prev.map((item) => (item.key === key ? { ...item, relativeName } : item)));
  };

  const handleChangeRelation = (key: string, relation: TRelation) => {
    setTableData((prev) => prev.map((item) => (item.key === key ? { ...item, relation } : item)));
  };

  const handleDeleteItems = (keys: React.Key[]) => {
    setTableData((prev) => prev.filter((item) => !keys.includes(item.key)));
  };

  const handleClearArea = () => {
    setResponseData('');
  };

  const handleFileLoad = (fileData: string) => {
    consultPrologSession(fileData);

    const rows = fileData.split('\r\n').filter((row) => row !== '' && !row.startsWith('%'));
    const parsedData: TRelativesTableData[] = [];
    let restData: string = '';

    let recordsExhausted = false;
    for (let i = 0; i < rows.length; i++) {
      const currentRow = rows[i];

      if (currentRow === RULES_STRING) {
        recordsExhausted = true;
      }

      if (!recordsExhausted) {
        parsedData.push(prologToData(currentRow));
      } else {
        restData += `${currentRow}\r\n`;
      }
    }

    setTableData(parsedData);
    setRestFileData(restData);
  };

  const handleSaveFile = () => {
    const newFileData = convertDataToProlog();
    consultPrologSession(newFileData);

    const file = new File([newFileData], 'new_file.pl', { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(file);
  };

  const handleAddItem = (item: TRelativesTableData) => {
    setTableData((prev) => prev.concat({ ...item, key: uuidv4() }));
    messageApi.open({ type: 'success', content: 'Запись добавлена' });
  };

  const handleSendQuery = (query: string) => {
    session.query(query, {
      success: () => {
        setResponseData('');
        session.answers(showAnswer);
      },
      error: (error: Error) => showError(error, 'Некорректный запрос Prolog'),
    });
  };

  return (
    <Layout>
      {contextHolder}
      <Content>
        <div className="mainContainer">
          <div className="header">
            <Typography.Title>Ларбораторная работа №3. Пролог</Typography.Title>
            <FileMenu onFileLoad={handleFileLoad} onSave={handleSaveFile} />
          </div>
          <RelativesTable
            data={tableData}
            onChangeName={handleChangeName}
            onChangeRelativeName={handleChangeRelativeName}
            onChangeRelation={handleChangeRelation}
            onDeleteItems={handleDeleteItems}
          />
          <AddItemForm onAdd={handleAddItem} />
          <div className="responseAndQueries">
            <ResponseArea data={responseData} onClearArea={handleClearArea} />
            <QueryForm onSendQuery={handleSendQuery} />
          </div>
        </div>
      </Content>
    </Layout>
  );
};
