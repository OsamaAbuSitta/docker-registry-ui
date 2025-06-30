import React, { useEffect, useState } from 'react';

interface Repository {
  name: string;
}

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [manifest, setManifest] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/repositories')
      .then(res => res.json())
      .then(data => setRepos(data.repositories || []));
  }, []);

  const loadTags = (repo: string) => {
    setSelectedRepo(repo);
    setSelectedTag(null);
    setManifest(null);
    fetch(`/api/repositories/${repo}/tags`)
      .then(res => res.json())
      .then(data => setTags(data.tags || []));
  };

  const loadManifest = (tag: string) => {
    if (!selectedRepo) return;
    setSelectedTag(tag);
    fetch(`/api/repositories/${selectedRepo}/tags/${tag}`)
      .then(res => res.json())
      .then(data => setManifest(data));
  };

  return (
    <div>
      <h1>Docker Registry UI</h1>
      {selectedRepo ? (
        <div>
          <button onClick={() => setSelectedRepo(null)}>Back</button>
          <h2>{selectedRepo}</h2>
          <ul>
            {tags.map(t => (
              <li key={t} onClick={() => loadManifest(t)}>{t}</li>
            ))}
          </ul>
          {selectedTag && manifest && (
            <div>
              <h3>{selectedTag}</h3>
              <pre>{JSON.stringify(manifest, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <ul>
          {repos.map(repo => (
            <li key={repo.name} onClick={() => loadTags(repo.name)}>{repo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
