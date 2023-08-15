import { ChangeImage } from "./ChangeImage";
import { Topbar, SettingsContainer } from "../../components/UI";
import { ChangeFirstName } from "./ChangeFirstName/ChangeFirstName";
import { ChangeLastName } from "./ChangeLastName";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

export const Profile = () => {
  const { profileImage, firstName, lastName } = useAuthenticatedUser();

  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h2>Profile Settings</h2>
      </Topbar>
      <SettingsContainer>
        <ChangeImage defaultImage={profileImage} />
        <ChangeFirstName initialValue={firstName} />
        <ChangeLastName initialValue={lastName} />
      </SettingsContainer>
    </>
  );
};
