import { LandingPage } from './LandingUtils';
import './LoginLanding.css';
import personInMagnifyingGlass from '../assets/personInMagnifyingGlass.svg'

// eslint-disable-next-line
const panelData = [,
  {
    id: 2,
    buttonText: "Find someone to hire",
    body: "You choose a worker. Filter by rating, distance and more",
    icon: personInMagnifyingGlass,
    redirectTo: "/tradesmanList",
    state: {}
  }
]

export default function LoginLandingForHelp() {
  return LandingPage(panelData)
}
