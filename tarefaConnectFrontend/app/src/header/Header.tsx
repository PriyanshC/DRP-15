import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

interface HeaderItem {
  key: string,
  class: string,
  iconClass: string,
  redirectTo: string,
  link: boolean,
  onClick: () => void
}

interface Props {
  changeTheme: () => void,
  currentTheme: string
}

export default function Header(props: Props) {
  const menuExpand = () => {
    const content = document.getElementById('collapse-menu');
    if (!content) {
      return;
    }
    if (content.style.maxHeight) {
      content.style.maxHeight = '';
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  const rightHeader: HeaderItem[] = [
    {
      key: "messages",
      class: 'bi-envelope-fill',
      iconClass: 'MessageIcon',
      redirectTo: "",
      link: false,
      onClick: () => { }
    },
    {
      key: 'profile',
      class: 'bi-person-circle',
      iconClass: 'ProfileIcon',
      redirectTo: "/loginRegister",
      link: false,
      onClick: () => { }
    }
  ];

  const leftHeader: HeaderItem[] = [
    {
      key: "menu",
      class: "bi-list",
      iconClass: 'MenuIcon',
      redirectTo: "",
      link: true,
      onClick: menuExpand
    },
    {
      key: "home",
      class: "bi-house-door-fill",
      iconClass: 'HomeIcon',
      redirectTo: "/",
      link: false,
      onClick: () => { }
    }
  ];

  // const lightIconDiv = <LightIcon />
  // const darkIconDiv = <DarkIcon />

  // const lightIcon = document.getElementById('light-icon')
  // const darkIcon = document.getElementById('dark-icon')


  const toggleTheme = () => {
    // if (!(lightIcon && darkIcon)) {
    //   return;
    // }
    // if (props.currentTheme === 'light') {
    //   lightIcon.style.display = 'none'
    //   darkIcon.style.display = 'block'
    // } else {
    //   lightIcon.style.display = 'block'
    //   darkIcon.style.display = 'none'
    // }
    props.changeTheme();
  }

  return (
    <div className='HeaderWrapper'>
      <div className="Header" >

        <MenuSection data={leftHeader} />

        <Link className='HeaderTitle' to="/" style={{ textDecoration: 'inherit', color: 'inherit' }}>
          <h1 className='HeaderTitleText' style={{ fontSize: 'inherit' }}>
            TarefaConnect
          </h1>
        </Link>

        <MenuSection data={rightHeader} />
      </div>
      <div className='MenuCollapse' id='collapse-menu'>
        <div className='CollapseIconBar'>
          <button onClick={toggleTheme} className='ThemeToggle'>
            Change Theme
            {props.currentTheme === 'light' ? <LightIcon /> : <DarkIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

function DarkIcon() {
  return (
    <i className='bi-moon-fill ThemeIcon'></i>
  );
}

function LightIcon() {
  return (
    <i className='bi-brightness-high-fill ThemeIcon'></i>
  );
}

interface MenuProps {
  data: HeaderItem[],
}

function MenuSection(props: MenuProps) {
  return (
    <div className='MenuSection'>
      {props.data.map((item) => {
        if (item.link) {
          return (
            <div key={item.key} className='MenuButton' onClick={item.onClick}>
              <div className={item.iconClass + ' HeaderIcon'}>
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
