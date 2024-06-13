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
      <section>
        <ul>
          {error ? (
            <li>{error}</li>
          ) : (
            <>
              {userData && (
                <li key={userData.id}>
                  {userData.login} ({userData.html_url})
                </li>
              )}
              {repos && repos.map((repo) => <li key={repo.id}>{repo.name}</li>)}
            </>
          )}
        </ul>
      </section>
      <section>
        <h2>
          <Link to="/">Return</Link>
        </h2>
      </section>
    </>
  );
}

export default User;
