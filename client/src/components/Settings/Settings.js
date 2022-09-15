import Navigation from "../Dashboard/Navigation/Navigation";
import SettingsBar from "./SettingsBar";
import { Outlet, useMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Content from "../UI/Content";

const Settings = () => {
  const url = useMatch("/settings/:SID");
  const sid = url?.params.SID;
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  console.log(sid);
  let content = "";

  if (isMobile) {
    if (sid) {
      content = (
        <Content>
            <Outlet />
        </Content>
      );
    } else {
      content = (
        <>
          <Navigation />
          <SettingsBar active={sid || ""} />
        </>
      );
    }
  } else {
    content = (
      <>
        <Navigation />
        <SettingsBar active={sid || ""} />
        <Content>
            <Outlet />
        </Content>
      </>
    );
  }

  return content;
};

export default Settings;
