import React from "react";
import { Form } from "semantic-ui-react";

function PostTypeSelector(props) {
  return (
    <Form>
      <Form.Group inline>
        <label>Select Post Type: </label>
        <Form.Radio
          label="Question"
          value="question"
          checked={props.postType === "question"}
          onChange={function () { props.setPostType("question"); }}
        />
        <Form.Radio
          label="Article"
          value="article"
          checked={props.postType === "article"}
          onChange={function () { props.setPostType("article"); }}
        />
      </Form.Group>
    </Form>
  );
}

export default PostTypeSelector;
