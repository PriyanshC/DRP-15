import { LandingPage } from './LandingUtils';
import './LoginLanding.css';
import personInMagnifyingGlass from '../assets/personInMagnifyingGlass.svg'
import postTask from '../assets/postTask.svg'

// eslint-disable-next-line
const panelData = [
  {
    id: 2,
    buttonText: "Find someone to hire",
    body: "You'll choose a tasker, filter by rating, distance and more",
    icon: personInMagnifyingGlass,
    redirectTo: "/tradesmanList"
  },
  {
    id: 3,
    buttonText: "Post a task",
    body: "You'll receive messages from taskers interested in helping you",
    icon: postTask,
    redirectTo: "/task"
  }
]

export default function LoginLandingForHelp() {
  return LandingPage(panelData)
}
