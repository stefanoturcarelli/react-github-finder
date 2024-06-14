import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/data";

function User() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${username}`);
        if (response && response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        if (error.response) {
          setError("User not found");
        } else {
          setError("An error occurred");
        }
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await api.get(`/users/${username}/repos`);
        if (response && response.data) {
          setRepos(response.data);
        }
      } catch (error) {
        if (error.response) {
          setError("Repos not found");
        } else {
          setError("An error occurred");
        }
      }
    };

    fetchUser();
    fetchRepos();
  }, [username]);

  return (
    <>
      <section className="section-user-component">
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            {userData && (
              <div className="user-container" key={userData.id}>
                <div className="user-avatar">
                  <img src={userData.avatar_url} alt="avatar-image" />
                </div>
                <div className="username">{userData.login}</div>
                <div className="repos-followers-following">
                  <div>
                    <p>{userData.public_repos}</p>
                    <p>Repositories</p>
                  </div>
                  <div>
                    <p>{userData.followers}</p>
                    <p>Followers</p>
                  </div>
                  <div>
                    <p>{userData.following}</p>
                    <p>Following</p>
                  </div>
                </div>
                <div className="go-to-github-button-container">
                  <a className="go-to-github-button" href={userData.html_url}>
                    Go to GitHub
                  </a>
                </div>
              </div>
            )}
            <div className="repos-list-container">
              <h2>My Repositories</h2>
              <div className="repos-list">
                {repos &&
                  repos.map((repo) => (
                    <div className="individual-repo" key={repo.id}>
                      <div>
                        <p className="repo-name">{repo.name}</p>
                        <p className="repo-description">{repo.description}</p>
                      </div>
                      <p className="repo-date">{new Date(repo.updated_at).toDateString()}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </section>
      <section>
        <h2>
          <Link className="return-button" to="/">
            Return
          </Link>
        </h2>
      </section>
    </>
  );
}

export default User;
