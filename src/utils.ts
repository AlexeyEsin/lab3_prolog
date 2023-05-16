import { v4 as uuidv4 } from 'uuid';

import { TRelation, TRelativesTableData } from 'types/types';

export const RULES_STRING = '/* rules */';

export const realtionMap: Record<TRelation, string> = {
  mother: 'мать',
  father: 'отец',
  sister: 'сестра',
  brother: 'брат',
};

export const prologToData = (row: string): TRelativesTableData => {
  const splitted = row.split(/[\(\)]/g);
  const relation = splitted[0] as TRelation;
  const relatives = splitted[1];

  const namesArray = relatives.split('"');
  const name = namesArray[1];
  const relativeName = namesArray[3];

  return { key: uuidv4(), name, relation, relativeName };
};

export const dataToProlog = (data: TRelativesTableData) => {
  return `${data.relation}("${data.name}", "${data.relativeName}").`;
};
