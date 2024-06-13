import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    if (query !== initialQuery) {
      setSearchParams({ query: query || "" }, { replace: true });
    }

    if (query.length === 0) {
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams, query, initialQuery]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setQuery(data.username.trim());
    navigate(`/user?username=${data.username.trim()}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search user"
          aria-label="Search user"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Search;
