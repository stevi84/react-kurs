import { FormApi } from 'final-form';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { BaseEntity } from '../../models/BaseEntity';
import { Column, CrudMode, DataTableRowOwnProps, DataTypes } from './DataTableInterfaces';
import { DateEdit, DateEditProps } from './DateEdit';
import { NumberEdit, NumberEditProps } from './NumberEdit';
import { StringEdit, StringEditProps } from './StringEdit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { BooleanEdit, BooleanEditProps } from './BooleanEdit';

interface DataTableRowEditOwnProps<EntityType> extends DataTableRowOwnProps<EntityType> {
  cancel: () => void;
}

export const DataTableRowEdit = <EntityType extends BaseEntity>(props: DataTableRowEditOwnProps<EntityType>) => {
  const { id, columns, rowData, rowIndex, manager, mode, lang, isSubmitting, cancel } = props;
  const { t } = useTranslation();

  const getCellComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    switch (column.datatype) {
      case DataTypes.NUMBER:
        return getNumberEditComponent(id, column);
      case DataTypes.STRING:
        return getStringEditComponent(id, column);
      case DataTypes.DATE:
        return getDateEditComponent(id, column);
      case DataTypes.BOOLEAN:
        return getBooleanEditComponent(id, column);
      default:
        return getStringEditComponent(id, column);
    }
  };

  const getNumberEditComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    return (
      <Field<string, HTMLElement, number, NumberEditProps>
        name={column.property as string}
        component={NumberEdit}
        validate={column.validateFn}
        id={id}
        lang={lang}
        placeholder={t(column.i18nKey || (column.property as string))}
      />
    );
  };

  const getStringEditComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    return (
      <Field<string, HTMLElement, string, StringEditProps>
        name={column.property as string}
        component={StringEdit}
        validate={column.validateFn}
        id={id}
        placeholder={t(column.i18nKey || (column.property as string))}
      />
    );
  };

  const getDateEditComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    return (
      <Field<Date, HTMLElement, string, DateEditProps>
        name={column.property as string}
        component={DateEdit}
        validate={column.validateFn}
        id={id}
        lang={lang}
      />
    );
  };

  const getBooleanEditComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    return (
      <Field<boolean, HTMLElement, boolean, BooleanEditProps>
        name={column.property as string}
        component={BooleanEdit}
        type={'checkbox'}
        validate={column.validateFn}
        id={id}
      />
    );
  };

  const getActionComponents = (
    invalid: boolean,
    pristine: boolean,
    handleSubmit: () => void,
    form: FormApi<EntityType>,
  ): React.ReactNode => {
    return (
      <TableCell align="right">
        <Tooltip
          title={
            pristine
              ? t('tooltip_no_changes')
              : invalid
                ? t('tooltip_invalid')
                : isSubmitting
                  ? t('tooltip_submitting')
                  : t('save')
          }
        >
          <span>
            <IconButton
              id={`${id}-row-${rowIndex}-button-save`}
              color="primary"
              onClick={handleSubmit}
              disabled={pristine || invalid || isSubmitting}
            >
              <CheckIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={t('cancel')}>
          <span>
            <IconButton id={`${id}-row-${rowIndex}-button-cancel`} color="primary" onClick={doCancel(form)}>
              <CloseIcon />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    );
  };

  /**
   * write only changed properties to the backend
   */
  const getUpdateEntity = (entity: EntityType, form: FormApi<EntityType>): Partial<EntityType> => {
    const updateEntity: Partial<EntityType> = {};
    updateEntity.id = entity.id;
    // updateEntity.versionTag = entity.versionTag;
    for (const prop in entity) {
      if (entity.hasOwnProperty(prop) && form.getFieldState(prop)?.dirty) {
        updateEntity[prop] = entity[prop];
      }
    }
    return updateEntity;
  };

  const save = (values: EntityType, form: FormApi<EntityType>) => {
    switch (mode) {
      case CrudMode.CREATE:
        manager.create(values);
        break;
      case CrudMode.UPDATE:
        manager.update(getUpdateEntity(values, form));
    }
    doCancel(form)();
  };

  const doCancel = (form: FormApi<EntityType>) => () => {
    form.initialize(manager.getEmpty());
    cancel();
  };

  return (
    <Form<EntityType> onSubmit={save} initialValues={mode === CrudMode.UPDATE ? rowData : manager.getEmpty()}>
      {({ invalid, pristine, handleSubmit, form }) => (
        <TableRow id={`${id}-row-${rowIndex}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {columns.map((column: Column<EntityType>, colIndex: number) => (
            <TableCell key={colIndex} align="left">
              {getCellComponent(`${id}-row-${rowIndex}-col-${colIndex}`, column)}
            </TableCell>
          ))}
          {getActionComponents(invalid, pristine, handleSubmit, form)}
        </TableRow>
      )}
    </Form>
  );
};
