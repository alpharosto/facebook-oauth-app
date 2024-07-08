import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.picture.data.url} alt={user.name} />
    </div>
  );
};

export default UserProfile;