import './styles.css';

import styles from '../Global';

const rightHeader = [
  {
    key: "messages",
    class: 'bi-envelope-fill',
    iconClass: 'MessageIcon  HeaderIcon'
  },
  {
    key: 'profile',
    class: 'bi-person-circle',
    iconClass: 'ProfileIcon  HeaderIcon'
  }
];

const leftHeader = [
  {
    key: "menu",
    class: "bi-list",
    iconClass: 'MenuIcon HeaderIcon'
  },
  {
    key: "home",
    class: "bi-house-door-fill",
    iconClass: 'HomeIcon  HeaderIcon'
  }
];

export default function Header() {
  const style = styles();

  return (
    <div className="Header" style={{ backgroundColor: style.colours.backgroundPrimary, borderBottom: '1px solid ' + style.colours.tertiary }}>

      <MenuSection colour={style.colours.primary} data={leftHeader} />

      <h1 style={{ margin: 'auto', color: style.colours.primary, flexGrow: 1, fontFamily: style.fonts.heading }}>
        TarefaConnect(hi jamie)
      </h1>

      <MenuSection colour={style.colours.primary} data={rightHeader} />
    </div>
  );
}

function MenuSection({ colour, data }) {
  return (
    <div className='MenuSection'>
      {data.map((item) => {
        return (
          <div key={item.key} className={item.iconClass}>
            <i style={{ color: colour }} className={item.class}></i>
          </div>
        )
      })}
    </div>
  );
}
