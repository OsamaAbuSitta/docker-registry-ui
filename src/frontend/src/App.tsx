import React, { useEffect, useState } from 'react';

interface Repository {
  name: string;
}

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('/api/repositories')
      .then(res => res.json())
      .then(data => setRepos(data.repositories || []));
  }, []);

  return (
    <div>
      <h1>Docker Registry UI</h1>
      <ul>
        {repos.map(repo => (
          <li key={repo.name}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
