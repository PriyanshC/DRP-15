import { LandingPage } from './LandingUtils';
import './LoginLanding.css';
import personInMagnifyingGlass from '../assets/personInMagnifyingGlass.svg'
import postTask from '../assets/postTask.svg'

// eslint-disable-next-line
const panelData = [
  {
    id: 3,
    buttonText: "Let Someone Find You",
    body: "Create a post and you'll receive messages from workers interested in helping you",
    icon: postTask,
    redirectTo: "/task",
    state: { startingId: -1 }
  },
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
