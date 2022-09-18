import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Icon from "../UI/Icon";
import appearanceIcon from "../../assets/icons/appearance.svg";
import profileIcon from "../../assets/icons/profile.svg";
import passwordIcon from "../../assets/icons/password.svg";
import Sidebar from "../UI/Sidebar";
import Container from "../UI/Container";

const SettingsBar = ({active}) => {

  return (
    <Sidebar>
      <h1>Settings</h1>
      <Container>
        <Link to="/settings/profile">
          <Card isActive={active === 'profile'}>
          <Icon noColor icon={profileIcon} />
            <h4>Profile</h4>
          </Card>
        </Link>
        <Link to="/settings/password">
          <Card isActive={active === 'password'}>
          <Icon noColor icon={passwordIcon} />
            <h4>Password</h4>
          </Card>
        </Link>
        <Link to="/settings/appearance">
          <Card isActive={active === 'appearance'}>
            <Icon noColor icon={appearanceIcon} />
            <h4>Appearance</h4>
          </Card>
        </Link>
      </Container>
    </Sidebar>
  );
};

export default SettingsBar;
