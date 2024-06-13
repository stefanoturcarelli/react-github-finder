import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/data";
import key from "../api/key.jsx.env";

const token = key;
const options = { headers: { Authorization: `Bearer ${token}` } };

function User() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const response = await api.get(`/${username}`, options);
        if (response && response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError("User not found");
        } else {
          console.log(`Error message: ${error.message}`);
          setError("An error occurred");
        }
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await api.get(`/${username}/repos`, options);
        if (response && response.data) {
          setRepos(response.data);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError("User not found");
        } else {
          console.log(`Error message: ${error.message}`);
          setError("An error occurred");
        }
      }
    };

    fetchUser();
    fetchRepos();
  }, [username]);

  const notFound = <li>User not found</li>;

  return (
    <>
      <section>
        <ul>
          {error
            ? notFound
            : userData && (
                <li key={userData.id}>
                  {userData.login} ({userData.html_url})
                </li>
              )}
        </ul>
      </section>
      <section>
        <h2>Repositories</h2>
        <ul>
          {repos.length > 0 ? (
            repos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </li>
            ))
          ) : (
            <li>No repositories found</li>
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
