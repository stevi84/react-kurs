import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BaseEntity } from '../../models/BaseEntity';
import { Column, DataTableRowOwnProps, DataTypes } from './DataTableInterfaces';
import { DateRead } from './DateRead';
import { NumberRead } from './NumberRead';
import { StringRead } from './StringRead';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BooleanRead } from './BooleanRead';

interface DataTableRowReadOwnProps<EntityType> extends DataTableRowOwnProps<EntityType> {
  setEdited: (entity: EntityType) => void;
  actionsActive: boolean;
}

export const DataTableRowRead = <EntityType extends BaseEntity>(props: DataTableRowReadOwnProps<EntityType>) => {
  const { id, columns, rowData, rowIndex, manager, lang, setEdited, actionsActive } = props;
  const { t } = useTranslation();

  const getCellComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    switch (column.datatype) {
      case DataTypes.NUMBER:
        return getNumberReadComponent(id, column);
      case DataTypes.STRING:
        return getStringReadComponent(id, column);
      case DataTypes.DATE:
        return getDateReadComponent(id, column);
      case DataTypes.BOOLEAN:
        return getBooleanReadComponent(id, column);
      default:
        return getStringReadComponent(id, column);
    }
  };

  const getNumberReadComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    const value: number = rowData[column.property] as unknown as number;
    return <NumberRead id={id} value={value} lang={lang} />;
  };

  const getStringReadComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    const value: string = rowData[column.property] as unknown as string;
    return <StringRead id={id} value={value} />;
  };

  const getDateReadComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    const value: string = rowData[column.property] as unknown as string;
    return <DateRead id={id} value={value} lang={lang} />;
  };

  const getBooleanReadComponent = (id: string, column: Column<EntityType>): React.ReactNode => {
    const value: boolean = rowData[column.property] as unknown as boolean;
    return <BooleanRead id={id} value={value} />;
  };

  const doSetEdited = () => setEdited(rowData);
  const doDelete = () => manager.delete(rowData);

  const getActionComponents = (): React.ReactNode => {
    return (
      <TableCell align="right">
        <Tooltip title={!actionsActive ? t('tooltip_action_inactive') : t('edit')}>
          <span>
            <IconButton
              id={`${id}-row-${rowIndex}-button-edit`}
              color="primary"
              onClick={doSetEdited}
              disabled={!actionsActive}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={!actionsActive ? t('tooltip_action_inactive') : t('delete')}>
          <span>
            <IconButton
              id={`${id}-row-${rowIndex}-button-delete`}
              color="primary"
              onClick={doDelete}
              disabled={!actionsActive}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    );
  };

  return (
    <TableRow id={`${id}-row-${rowIndex}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {columns.map((column: Column<EntityType>, colIndex: number) => (
        <TableCell key={colIndex} align="left">
          {getCellComponent(`${id}-row-${rowIndex}-col-${colIndex}`, column)}
        </TableCell>
      ))}
      {getActionComponents()}
    </TableRow>
  );
};
