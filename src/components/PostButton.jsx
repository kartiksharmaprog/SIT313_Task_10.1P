import React from "react";
import { Button, Form } from "semantic-ui-react";

function PostButton(props) {
  return (
    <Form.Field style={{ textAlign: "right" }}>
      <Button color="blue" type="submit" onClick={props.onClick}>
        Post
      </Button>
    </Form.Field>
  );
}

export default PostButton;
