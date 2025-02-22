import Header from "@/components/Header/Header";

const Settings = () => {
  const userSettings = {
    username: "John Doe",
    email: "john@com.com",
    teamName: "Team name",
    roleName: "Role",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyle =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyle}>{userSettings.username}</div>
        </div>

        <div>
          <label className={labelStyles}>email</label>
          <div className={textStyle}>{userSettings.email}</div>
        </div>

        <div>
          <label className={labelStyles}>Team Name</label>
          <div className={textStyle}>{userSettings.teamName}</div>
        </div>

        <div>
          <label className={labelStyles}>Role Name</label>
          <div className={textStyle}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
