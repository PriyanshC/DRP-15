import { LandingPage } from './LandingUtils';
import './LoginLanding.css';
import handHoldingService from '../assets/handHoldingService.svg'
import personRaisingHand from '../assets/personRaisingHand.svg' 

// eslint-disable-next-line
const panelData = [
  {
    id: 0,
    buttonText: "Need help with something?",
    body: "Get help from a worker for repeating tasks",
    icon: personRaisingHand,
    redirectTo: "/findHelp"
  },
  {
    id: 1,
    buttonText: "Want to start earning?",
    body: "Reach out to people and get paid to help",
    icon: handHoldingService,
    redirectTo: "/taskList"
  }
]

export default function LoginLanding() {
  return LandingPage(panelData)
}
