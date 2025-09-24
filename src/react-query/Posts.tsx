import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import usePosts from "./hooks/usePosts";
import { BsChevronDown } from "react-icons/bs";

export default function Posts() {
  const [userId, setUserId] = useState<number | undefined>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data: posts, error, isLoading, refetch } = usePosts({ page, pageSize, userId });

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
            <MenuItem
              value={userId}
              key={userId}
              onClick={() => {
                setUserId(userId);
              }}
            >
              {`User ${userId}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {posts?.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}

      <div>
        <Button
          whiteSpace="normal"
          textAlign="left"
          onClick={() => setPage(page - 1)}
          fontSize="md"
          variant="link"
        >
          Previous
        </Button>

        <Button
          whiteSpace="normal"
          textAlign="right"
          onClick={() => setPage(page + 1)}
          fontSize="md"
          marginStart={"4"}
          variant="link"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
