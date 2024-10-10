import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ href, text, isActive, onClick }) => {
    return (
        <li>
        <a
          href={href}
          className={`menu_item flex ${isActive ? 'active' : ''}`}
          role="menuitem"
          aria-current={isActive ? 'true' : undefined}
          onClick={onClick}
        >
          <div className="menu_text">{text}</div>
        </a>
      </li>
    );
  };
  
  // PropTypes를 사용하여 컴포넌트의 props 유형을 정의
MenuItem.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    ariaCurrent: PropTypes.string,
  };
  
  MenuItem.defaultProps = {
    ariaCurrent: 'false',
  };
  
  export default MenuItem;