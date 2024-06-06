import { LandingPage } from './LandingUtils';
import './LoginLanding.css';

// eslint-disable-next-line
const panelData = [
  {
    id: 2,
    buttonText: "Find someone to hire",
    body: "You'll choose a tasker, filter by rating, distance and more",
    redirectTo: "/tradesmanList"
  },
  {
    id: 3,
    buttonText: "Post a task",
    body: "You'll receive messages from taskers interested in helping you",
    redirectTo: "/task"
  }
]

export default function LoginLandingForHelp() {
  return LandingPage(panelData)
}
