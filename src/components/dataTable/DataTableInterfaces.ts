import { FieldValidator } from 'final-form';
import { Locale } from '../../globals/Translations';

export enum DataTypes {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
}

export enum CrudMode {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
}

export interface EntityManager<EntityType> {
  create: (entity: EntityType) => void;
  read: () => void;
  update: (entity: Partial<EntityType>) => void;
  delete: (entity: EntityType) => void;
  getEmpty: () => EntityType;
}

export interface Column<EntityType> {
  property: keyof EntityType;
  datatype: DataTypes;
  i18nKey?: string;
  validateFn?: FieldValidator<any>;
}

export interface DataTableOwnProps<EntityType> {
  id: string;
  columns: Column<EntityType>[];
  rowsData: EntityType[];
  manager: EntityManager<EntityType>;
  lang: Locale;
  isReading: boolean;
  isSubmitting: boolean;
}

export interface DataTableRowOwnProps<EntityType> {
  id: string;
  columns: Column<EntityType>[];
  rowData: EntityType;
  rowIndex: string;
  manager: EntityManager<EntityType>;
  mode: CrudMode;
  lang: Locale;
  isReading: boolean;
  isSubmitting: boolean;
}
