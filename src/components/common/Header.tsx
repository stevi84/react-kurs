import { LanguageSwitch } from './LanguageSwitch';
import './header.css';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { dataTableVisibleSelector, setDataTableVisible } from '../../reducers/DataTableReducer';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const dataTableVisible = useAppSelector(dataTableVisibleSelector);
  const onLogoChange = (e: ChangeEvent<HTMLInputElement>) => setShowLogo(e.target.checked);
  const onTableChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setDataTableVisible(e.target.checked));

  return (
    <div className='header-container'>
      {showLogo && <div data-testid='header-logo' className='header-item header-icon'>
        🌐
      </div>}
      <div className='header-item header-text'>
        React-App
      </div>
      <div className='header-item'>
        <input id='header-logo-checkbox' type='checkbox' checked={showLogo} onChange={onLogoChange}></input>
        <label htmlFor='header-logo-checkbox'>Logo</label>
      </div>
      <div className='header-item'>
        <input id='header-table-checkbox' type='checkbox' checked={dataTableVisible} onChange={onTableChange}></input>
        <label htmlFor='header-table-checkbox'>Tabelle</label>
      </div>
      <div className='header-item'>
        <LanguageSwitch />
      </div>
    </div>
  );
};
