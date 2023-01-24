import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseEntity } from '../../models/BaseEntity';
import { Column, CrudMode, DataTableOwnProps } from './DataTableInterfaces';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { DataTableRowEdit } from './DataTableRowEdit';
import { DataTableRowRead } from './DataTableRowRead';

/*
  Diese Tabelle ist nur ein Beispiel. In einem echten Projekt besser eine Tabellenbibliothek wie aggrid/MaterialUi
  Datagrid verwenden.
*/

export const DataTable = <EntityType extends BaseEntity>(props: DataTableOwnProps<EntityType>) => {
  const { id, columns, rowsData, manager, lang, isReading, isSubmitting } = props;
  const { t } = useTranslation();

  const [isAddEntity, setIsAddEntity] = useState<boolean>(false);
  const [isEditEntity, setIsEditEntity] = useState<boolean>(false);
  const [editedEntityId, setEditedEntityId] = useState<number>(0);

  const isEditing: boolean = isAddEntity || isEditEntity;

  const setAddEntity = useCallback(() => {
    setIsAddEntity(true);
    setIsEditEntity(false);
    setEditedEntityId(0);
  }, [setIsAddEntity, setIsEditEntity, setEditedEntityId]);

  const setEditedEntity = useCallback((entity: EntityType) => {
    setIsAddEntity(false);
    setIsEditEntity(true);
    setEditedEntityId(entity.id);
  }, [setIsAddEntity, setIsEditEntity, setEditedEntityId]);

  const cancel = useCallback(() => {
    setIsAddEntity(false);
    setIsEditEntity(false);
    setEditedEntityId(0);
  }, [setIsAddEntity, setIsEditEntity, setEditedEntityId]);

  return (
    <div className='dialog'>
      <Tooltip
        title={
          isEditing
            ? t('tooltip_action_inactive')
            : isReading
              ? t('tooltip_reading')
              : isSubmitting
                ? t('tooltip_submitting')
                : ''
        }
      >
        <span>
          <Button
            id={`${id}-button-reload`}
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={manager.read}
            disabled={isEditing || isReading || isSubmitting}
          >
            {t('reload')}
          </Button>
        </span>
      </Tooltip>
      <Tooltip
        title={
          isEditing
            ? t('tooltip_action_inactive')
            : isReading
              ? t('tooltip_reading')
              : isSubmitting
                ? t('tooltip_submitting')
                : ''
        }
      >
        <span>
          <Button
            id={`${id}-button-create`}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={setAddEntity}
            disabled={isEditing || isReading || isSubmitting}
          >
            {t('create')}
          </Button>
        </span>
      </Tooltip>
      <TableContainer component={Paper}>
        <Table id={id} sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow id={`${id}-row-head`}>
              {columns.map((column: Column<EntityType>, index: number) => (
                <TableCell key={index} align="left">
                  {t(column.i18nKey || (column.property as string))}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isReading && !isSubmitting && (
            <TableBody>
              {isAddEntity && (
                <DataTableRowEdit<EntityType>
                  id={id}
                  columns={columns}
                  rowData={undefined as unknown as EntityType}
                  rowIndex={'new'}
                  manager={manager}
                  mode={CrudMode.CREATE}
                  lang={lang}
                  isReading={isReading}
                  isSubmitting={isSubmitting}
                  cancel={cancel}
                />
              )}
              {rowsData.map((rowData: EntityType, index: number) => {
                return isEditEntity && rowData.id === editedEntityId ? (
                  <DataTableRowEdit<EntityType>
                    key={index}
                    id={id}
                    columns={columns}
                    rowData={rowData}
                    rowIndex={index.toString()}
                    manager={manager}
                    mode={CrudMode.UPDATE}
                    lang={lang}
                    isReading={isReading}
                    isSubmitting={isSubmitting}
                    cancel={cancel}
                  />
                ) : (
                  <DataTableRowRead
                    key={index}
                    id={id}
                    columns={columns}
                    rowData={rowData}
                    rowIndex={index.toString()}
                    manager={manager}
                    mode={CrudMode.READ}
                    lang={lang}
                    isReading={isReading}
                    isSubmitting={isSubmitting}
                    setEdited={setEditedEntity}
                    actionsActive={!isEditing}
                  />
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {(isReading || isSubmitting) && (
        <div>
          <CircularProgress id='loading-spinner' />
          {`${t(isReading ? 'reading' : 'submitting')}...`}
        </div>
      )}
    </div>
  );
};
