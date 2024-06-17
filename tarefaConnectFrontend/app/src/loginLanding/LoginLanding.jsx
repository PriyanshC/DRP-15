import { LandingPage } from './LandingUtils';
import './LoginLanding.css';
import earnMoney from '../assets/earnMoney.svg'
import postTask from '../assets/postTask.svg'

// eslint-disable-next-line
const userPanel =
{
  id: 3,
  buttonText: "Let Someone Find You",
  body: "Create a post and you'll receive messages from workers interested in helping you",
  icon: postTask,
  redirectTo: "/task",
  state: { startingId: -1 }
};
const taskerPanel =
{
  id: 1,
  buttonText: "Want to start earning?",
  body: "Reach out to people and get paid to help",
  icon: earnMoney,
  redirectTo: "/taskList",
  state: {}
};

export default function LoginLanding({ isTasker }) {
  return LandingPage(isTasker ? [userPanel, taskerPanel] : [userPanel]);
}
