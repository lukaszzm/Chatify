import { ChangeImage } from "./ChangeImage";
import { Topbar, SettingsContainer } from "../../components/UI";
import { useAuth } from "../../hooks/useAuth";
import { ChangeFirstName } from "./ChangeFirstName/ChangeFirstName";
import { ChangeLastName } from "./ChangeLastName";

export const Profile = () => {
  const { authData } = useAuth();

  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h2>Profile Settings</h2>
      </Topbar>
      <SettingsContainer>
        <ChangeImage
          defaultImage={authData!.profileImage}
          userId={authData!._id}
        />
        <ChangeFirstName initialValue={authData!.firstName} />
        <ChangeLastName initialValue={authData!.lastName} />
      </SettingsContainer>
    </>
  );
};
