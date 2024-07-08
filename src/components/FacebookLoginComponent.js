
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({ onSuccess, onFailure }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      onSuccess(response);
    } else {
      onFailure(response);
    }
  };

  return (
    <FacebookLogin
      appId="1627135887856403"
      autoLoad={true}
      fields="name,email,picture"
      scope="pages_show_list,read_insights"
      callback={responseFacebook}
    />
  );
};

export default FacebookLoginComponent;