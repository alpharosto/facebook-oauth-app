import React, { useState } from 'react';
import FacebookLoginComponent from './components/FacebookLoginComponent';
import UserProfile from './components/UserProfile';
import PageSelect from './components/PageSelect';
import PageStats from './components/PageStats';
import axios from 'axios';


const App = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);

  const [selectedPage, setSelectedPage] = useState(null);
  const [pageStats, setPageStats] = useState(null);

  const handleLoginSuccess = (response) => {
    setUser(response);
    fetchPages(response.accessToken);
  };

  const handleLoginFailure = (response) => {
    console.log('Login failed:', response);
  };

  const fetchPages = async (accessToken) => {
    const response = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
    setPages(response.data.data);
  };

  const fetchPageStats = async (pageId) => {
    const since = '2023-01-01';
    const until = '2023-12-31';
    const accessToken = user.accessToken;
    const response = await axios.get(
      `https://graph.facebook.com/${pageId}/insights?metric=page_impressions,page_engaged_users,page_fans,page_actions_post_reactions_total&since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`
    );
    const stats = response.data.data.reduce((acc, item) => {
      acc[item.name] = item.values[0].value;
      return acc;
    }, {});
    setPageStats({
      followers: stats.page_fans,
      engagement: stats.page_engaged_users,
      impressions: stats.page_impressions,
      reactions: stats.page_actions_post_reactions_total,
    });
  };

  const handlePageSelect = (pageId) => {
    setSelectedPage(pageId);
    fetchPageStats(pageId);
  };

  return (
    <div className="App">
      {!user ? (
        <FacebookLoginComponent onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
      ) : (
        <div>
          <UserProfile user={user} />
          <PageSelect pages={pages} onSelectPage={handlePageSelect} />
          {pageStats && <PageStats stats={pageStats} />}
        </div>
      )}
    </div>
  );
};

export default App;