import React from 'react';

const PageStats = ({ stats }) => {
  return (
    <div>
      <div>Followers: {stats.followers}</div>
      <div>Engagement: {stats.engagement}</div>
      <div>Impressions: {stats.impressions}</div>
      <div>Reactions: {stats.reactions}</div>
    </div>
  );
};

export default PageStats;