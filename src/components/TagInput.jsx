import React, { useState } from "react";
import { Input, Label } from "semantic-ui-react";

function TagInput(props) {
  const [input, setInput] = useState("");

  function addTag(text) {
    var tag = text.trim();
    if (tag === "") return;

    if (props.tags.includes(tag)) {
      setInput("");
      return;
    }

    if (props.tags.length >= 3) {
      alert("You can only add up to 3 tags.");
      setInput("");
      return;
    }

    props.setTags([...props.tags, tag]);
    setInput("");
  }

  function removeTag(index) {
    var newTags = props.tags.filter(function (t, i) {
      return i !== index;
    });
    props.setTags(newTags);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(input);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        {props.tags.map(function (tag, i) {
          return (
            <Label key={i} color="grey" style={{ marginBottom: "6px" }}>
              {tag}
              <span
                style={{ marginLeft: "6px", cursor: "pointer" }}
                onClick={function () { removeTag(i); }}
              >
                
              </span>
            </Label>
          );
        })}
      </div>

      <Input
        fluid
        placeholder={props.placeholder}
        value={input}
        onChange={function (e) { setInput(e.target.value); }}
        onKeyDown={handleKeyDown}
        onBlur={function () { addTag(input); }}
      />
      <div style={{ fontSize: "12px", marginTop: "6px", color: "#555" }}>
        Press Enter or comma to add a tag
      </div>
    </div>
  );
}

export default TagInput;
