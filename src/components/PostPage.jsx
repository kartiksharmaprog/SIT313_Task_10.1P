import React, { useState } from "react";
import { Container, Segment, Header } from "semantic-ui-react";
import PostTypeSelector from "./PostTypeSelector";
import QuestionForm from "./QuestionForm";
import ArticleForm from "./ArticleForm";

function PostPage(props) {
  const [postType, setPostType] = useState("question");

  return (
    <Container style={{ marginTop: "20px" }}>
      <Segment>
        <Header as="h3">New Post</Header>
        <PostTypeSelector postType={postType} setPostType={setPostType} />
      </Segment>

      <Segment>
        <Header as="h4">What do you want to ask or share?</Header>
        {
        postType === "question" ? (<QuestionForm  />) : (<ArticleForm  />)
        }
      </Segment>
    </Container>
  );
}

export default PostPage;
