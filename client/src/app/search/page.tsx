"use client";

import { useSearchQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/Header/Header";
import TaskCard from "@/components/TaskCard/TaskCard";
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import UserCard from '@/components/UserCard/UserCard';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResult,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, { skip: searchTerm.length < 3 });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occured while fetching search results.</p>}
        {!isLoading && !isError && searchResult && (
          <div>
            {/* Tasks  */}
            {searchResult.tasks && searchResult.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResult.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {/* Projects */}
            {searchResult.projects && searchResult.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResult.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* USERS  */}
            {searchResult.users && searchResult.users?.length > 0 && (
              <h2>Users</h2>
            )}
            {searchResult.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
