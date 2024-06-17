import { LandingPage } from './LandingUtils';
import './LoginLanding.css';
import earnMoney from '../assets/earnMoney.svg'
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
    id: 1,
    buttonText: "Want to start earning?",
    body: "Reach out to people and get paid to help",
    icon: earnMoney,
    redirectTo: "/taskList",
    state: {}
  }
]

export default function LoginLanding({ isTasker }) {
  return LandingPage(panelData.slice(0, isTasker ? 1 : panelData.length - 1));
}
