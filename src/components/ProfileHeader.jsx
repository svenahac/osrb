// ProfileHeader.js
import React from "react";

const ProfileHeader = (props) => {
  const { userData } = props;
  return (
    <div className="relative h-32 w-full flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-200 rounded-full h-12 w-12 flex items-center justify-center">
          <span className="text-xl">P</span>
        </div>
        <div>
          <div className="text-xl font-bold">
            {userData.user_metadata.display_name.toUpperCase()}
          </div>
          <div className="text-sm text-gray-700">Bookmarked content</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
