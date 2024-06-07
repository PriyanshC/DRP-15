import { LandingPage } from './LandingUtils';
import './LoginLanding.css';
import handHoldingService from '../assets/handHoldingService.svg'
import personRaisingHand from '../assets/personRaisingHand.svg' 

// eslint-disable-next-line
const panelData = [
  {
    id: 0,
    buttonText: "I need help with something",
    body: "Get help from a worker to complete your job",
    icon: personRaisingHand,
    redirectTo: "/findHelp"
  },
  {
    id: 1,
    buttonText: "I provide a service",
    body: "See what people need doing and negotiate a contract",
    icon: handHoldingService,
    redirectTo: "/taskList"
  }
]

export default function LoginLanding() {
  return LandingPage(panelData)
}
