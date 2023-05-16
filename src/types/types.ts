export type TRelation = 'father' | 'mother' | 'brother' | 'sister';

export type TRelativesTableData = {
  key: string;
  name: string;
  relation: TRelation;
  relativeName: string;
};

export type TQueryForm = {
  query: string;
};
