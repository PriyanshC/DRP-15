import './Header.css';

import { Link } from 'react-router-dom';

const rightHeader = [
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

const leftHeader = [
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

export default function Header() {
  return (
    <div className="Header" >

      <MenuSection data={leftHeader} />

      <Link className='HeaderTitle' to="/" style={{ textDecoration: 'inherit', color: 'inherit' }}>
        <h1 className='HeaderTitleText' style={{ fontSize: 'inherit' }}>
          TarefaConnect
        </h1>
      </Link>

      <MenuSection data={rightHeader} />
    </div>
  );
}

function MenuSection({ data }) {
  return (
    <div className='MenuSection'>
      {data.map((item) => {
        return (
          <Link key={item.key} className='MenuButton' to={item.redirectTo}>
            <div className={item.iconClass + ' HeaderIcon'}>
              <i className={item.class}></i>
            </div>
          </Link>
        )
      })}
    </div>
  );
}
