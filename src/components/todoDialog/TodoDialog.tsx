import { Component } from 'react';
import { AppDispatch, RootState } from '../../reducers/Store';
import { connect } from 'react-redux';
import { Locale } from '../../globals/Translations';
import { getEmptyTodo, Todo } from '../../models/Todo';
import {
  createTodo,
  deleteTodo,
  readTodos,
  todosSelector,
  updateTodo,
} from '../../reducers/TodosReducer';
import { Header } from '../common/Header';
import { DataTypes } from '../dataTable/DataTableInterfaces';
import { DataTable } from '../dataTable/DataTable';
import { formIsIsoDate, formIsNotEmptyString } from '../../globals/FormValidations';
import { ModalConfirmCancel } from '../common/ModalConfirmCancel';
import { WithTranslation, withTranslation } from 'react-i18next';
import { isReadingSelector, isSubmittingSelector } from '../../reducers/ApiCallsReducer';
import { dataTableVisibleSelector } from '../../reducers/DataTableReducer';
import useNotifier from '../../hooks/UseNotifier';

interface DoneDialogProps {
  todos: Todo[];
  isReading: boolean;
  isSubmitting: boolean;
  dataTableVisible: boolean;
}

interface DoneDialogState {
  initialized: boolean;
  deleteModalState: { visible: boolean, entityId: number }
}

interface DispatchProps {
  dispatch: AppDispatch
}

function Notify() {
  useNotifier();
  return (<></>);  // Hier gibt es nichts zu sehen
}

class TodoDialogComponent extends Component<DoneDialogProps & DispatchProps & WithTranslation, DoneDialogState> {
  constructor(props: DoneDialogProps & DispatchProps & WithTranslation) {
    super(props);
    this.state = {
      initialized: false,
      deleteModalState: { visible: false, entityId: -1 },
    };
  }

  private setDeleteModalState (state: { visible: boolean, entityId: number }) { 
    this.setState(prevState => ({...prevState, deleteModalState: state }));
  }

  public componentDidMount(): void {
    const { initialized } = this.state;
    const { dispatch } = this.props;
    if (!initialized) {
      this.setState(prevState => ({...prevState, initialized: true}));
      dispatch(readTodos());
    }
  }

  public render() {
    const { dataTableVisible, isSubmitting, isReading, todos } = this.props;
    const { t, i18n, dispatch } = this.props;
    const { deleteModalState } = this.state;
    const lang: Locale = i18n.language as Locale;

    return (
      <div>
        <Notify />
        <Header />
        {dataTableVisible ?
          <DataTable<Todo>
            id={'todo-table'}
            columns={[
              { property: 'owner', datatype: DataTypes.STRING, validateFn: formIsNotEmptyString },
              { property: 'dueDate', datatype: DataTypes.DATE, validateFn: formIsIsoDate },
              { property: 'description', datatype: DataTypes.STRING, validateFn: formIsNotEmptyString },
              { property: 'completed', datatype: DataTypes.BOOLEAN },
            ]}
            rowsData={todos}
            manager={{
              create: (entity: Todo) => dispatch(createTodo(entity)),
              read: () => dispatch(readTodos()),
              update: (entity: Partial<Todo>) => dispatch(updateTodo(entity)),
              delete: (entity: Todo) => this.setDeleteModalState({ visible: true, entityId: entity.id }),
              getEmpty: getEmptyTodo,
            }}
            lang={lang}
            isReading={isReading}
            isSubmitting={isSubmitting}
          />
          : <div></div>}
        <ModalConfirmCancel
          isOpen={deleteModalState.visible}
          headerText={t('delete')}
          bodyText={t('dialog_delete_text')}
          confirmButtonText={t('delete')}
          cancelButtonText={t('cancel')}
          confirmAction={() => {
            dispatch(deleteTodo(deleteModalState.entityId));
            this.setDeleteModalState({ visible: false, entityId: -1 });
          }}
          cancelAction={() => this.setDeleteModalState({ visible: false, entityId: -1 })}
        />
      </div>
    );  
  }
}

const mapStateToProps = (state: RootState): DoneDialogProps => ({
  todos: todosSelector(state),
  isReading: isReadingSelector(state),
  isSubmitting: isSubmittingSelector(state),
  dataTableVisible: dataTableVisibleSelector(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({dispatch});

export const TodoDialog = connect<DoneDialogProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(TodoDialogComponent));
