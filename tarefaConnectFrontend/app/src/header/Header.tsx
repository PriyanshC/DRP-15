import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

interface HeaderItem {
  key: string,
  class: string,
  iconClass: string,
  redirectTo: string
}

const rightHeader: HeaderItem[] = [
  {
    key: "messages",
    class: 'bi-envelope-fill',
    iconClass: 'MessageIcon',
    redirectTo: ""
  },
  {
    key: 'profile',
    class: 'bi-person-circle',
    iconClass: 'ProfileIcon',
    redirectTo: "/loginRegister"
  }
];

const leftHeader: HeaderItem[] = [
  {
    key: "menu",
    class: "bi-list",
    iconClass: 'MenuIcon',
    redirectTo: ""
  },
  {
    key: "home",
    class: "bi-house-door-fill",
    iconClass: 'HomeIcon',
    redirectTo: "/"
  }
];

interface Props {
  changeTheme: () => void
}

export default function Header(props: Props) {
  return (
    <div className='HeaderWrapper'>
      <div className="Header" >

        <MenuSection data={leftHeader} changeTheme={props.changeTheme} />

        <Link className='HeaderTitle' to="/" style={{ textDecoration: 'inherit', color: 'inherit' }}>
          <h1 className='HeaderTitleText' style={{ fontSize: 'inherit' }}>
            TarefaConnect
          </h1>
        </Link>

        <MenuSection data={rightHeader} changeTheme={props.changeTheme} />
      </div>
    </div>
  );
}

interface MenuProps {
  data: HeaderItem[],
  changeTheme: () => void
}

function MenuSection(props: MenuProps) {
  return (
    <div className='MenuSection'>
      {props.data.map((item) => {
        if (item.key === 'menu') {
          return (
            <div key={item.key} className='MenuButton'>
              <div className={item.iconClass + ' HeaderIcon'} onClick={props.changeTheme}>
                <i className={item.class}></i>
              </div>
            </div>
          );
        }
        return (
          <Link key={item.key} className='MenuButton' to={item.redirectTo}>
            <div className={item.iconClass + ' HeaderIcon'}>
              <i className={item.class}></i>
            </div>
          </Link>
        )
      })}
    </div >
  );
}
