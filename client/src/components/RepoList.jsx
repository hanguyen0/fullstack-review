import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <ul>
      {repos.map((repo, idx) =>
        <li key={repo.id + idx}>
          <a href={repo.url}>{repo.name}</a>, forks: {repo.forks}</li>
      )}
    </ul>

  </div>
)

export default RepoList;