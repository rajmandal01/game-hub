import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import usePosts from "./hooks/usePosts";
import { BsChevronDown } from "react-icons/bs";
import useInfinitePosts from "./hooks/useInfinitePosts";

export default function InfintePosts() {
  const [userId, setUserId] = useState<number | undefined>();
  const [pageSize, setPageSize] = useState<number>(10);
  const {
    data: posts,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfinitePosts({ pageSize, userId });

  if (isLoading) <p>Loading posts...</p>;
  if (error) <p>{error.message}</p>;

  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          {userId ? `User ${userId}` : "Select User"}
        </MenuButton>
        <MenuList>
          {[1, 2, 3].map((userId) => (
            <MenuItem value={userId} key={userId} onClick={() => setUserId(userId)}>
              {`User ${userId}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {posts?.pages.map((page) =>
        page.map((post) => (
          <div key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))
      )}

      <div>
        <Button
          whiteSpace="normal"
          textAlign="right"
          onClick={() => fetchNextPage()}
          fontSize="md"
          marginStart={"4"}
          variant="link"
        >
          Load More
        </Button>
      </div>
    </div>
  );
}
