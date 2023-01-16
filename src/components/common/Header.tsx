import { LanguageSwitch } from './LanguageSwitch';
import './header.css';
import { ChangeEvent, useState } from 'react';

export const Header = () => {
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const onLogoChange = (e: ChangeEvent<HTMLInputElement>) => setShowLogo(e.target.checked);

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
        <LanguageSwitch />
      </div>
    </div>
  );
};
