import './styles.css';

import styles from '../Global';
import { Link } from 'react-router-dom';

const rightHeader = [
  {
    key: "messages",
    class: 'bi-envelope-fill',
    iconClass: 'MessageIcon  HeaderIcon',
    redirectTo: ""
  },
  {
    key: 'profile',
    class: 'bi-person-circle',
    iconClass: 'ProfileIcon  HeaderIcon',
    redirectTo: "/loginRegister"
  }
];

const leftHeader = [
  {
    key: "menu",
    class: "bi-list",
    iconClass: 'MenuIcon HeaderIcon',
    redirectTo: ""
  },
  {
    key: "home",
    class: "bi-house-door-fill",
    iconClass: 'HomeIcon  HeaderIcon',
    redirectTo: ""
  }
];

export default function Header() {
  const style = styles();

  return (
    <div className="Header" style={{ backgroundColor: style.colours.backgroundPrimary, borderBottom: '1px solid ' + style.colours.tertiary }}>

      <MenuSection colour={style.colours.primary} data={leftHeader} />

      <Link className='HeaderTitle' to="/" style={{ textDecoration: 'none' }}>
        <h1  style={{ margin: 'auto', color: style.colours.primary, flexGrow: 1, fontFamily: style.fonts.heading }}>
          TarefaConnect
        </h1>
      </Link>

      <MenuSection colour={style.colours.primary} data={rightHeader} />
    </div>
  );
}

function MenuSection({ colour, data }) {
  return (
    <div className='MenuSection'>
      {data.map((item) => {
        return (
          <Link className='MenuButton' to={item.redirectTo}>
            <div key={item.key} className={item.iconClass}>
            <i style={{ color: colour }} className={item.class}></i>
            </div>
          </Link> 
        )
      })}
    </div>
  );
}
