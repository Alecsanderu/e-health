export interface ITableColumnConfiguration {
  fieldName: string;
  header: string;
  colType: 'date' | 'text';
  translationKey?: string;
}
