import UserPrivacyToggledSwitch from "./UserPrivacyToggleSwitch";

const UserPrivacyConditionWithSwith = ({
  conditionTitle,
  conditionName,
  value,
  handleBlur,
  handleChange,
}) => {
  return (
    <div className="user-privacy-main-a">
      <p>{conditionTitle}</p>
      <div className="pro-privacy position-relative">
        <input
          type="checkbox"
          onChange={handleChange}
          name={conditionName}
          onBlur={handleBlur}
          checked={value}
          className="position-absolute"
        />
        <UserPrivacyToggledSwitch privacyStatus={!value} />
      </div>
    </div>
  );
};

export default UserPrivacyConditionWithSwith;
