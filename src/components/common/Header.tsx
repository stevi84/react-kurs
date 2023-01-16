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
      {showLogo && <div className='header-item header-icon'>
        🌐
      </div>}
      <div className='header-item header-text'>
        React-App
      </div>
      <div className='header-item'>
        <input type='checkbox' checked={showLogo} onChange={onLogoChange}></input>
        <span>Logo</span>
      </div>
      <div className='header-item'>
        <input type='checkbox' checked={dataTableVisible} onChange={onTableChange}></input>
        <span>Tabelle</span>
      </div>
      <div className='header-item'>
        <LanguageSwitch />
      </div>
    </div>
  );
};
