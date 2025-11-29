import React, { useState } from "react";
import { Form, TextArea } from "semantic-ui-react";
import TagInput from "./TagInput";
import PostButton from "./PostButton";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function ArticleForm(props) {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw0bxzmum/image/upload";
  const CLOUDINARY_PRESET = "task8.1";

  async function handleImageUpload(file) {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_PRESET);
    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: data });
    const json = await res.json();
    setImageUrl(json.secure_url);
    setUploading(false);
  }

  async function handleSubmit() {
    if (!title.trim() || !abstract.trim() || !text.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    let url = imageUrl;
    if (image && !imageUrl) {
      await handleImageUpload(image);
      url = imageUrl;
    }
    const postData = {
      type: "article",
      title: title.trim(),
      abstract: abstract.trim(),
      articleText: text.trim(),
      tags: tags,
      imageUrl: url,
      createdAt: new Date(),
    };
    
    await addDoc(collection(db, "posts"), postData);
    alert("Article posted successfully!");
    setTitle("");
    setAbstract("");
    setText(""); 
    setTags([]); 
    setImage(null); 
    setImageUrl("");
  }

  return (
    <Form>
      <Form.Field>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Article Title" />
      </Form.Field>
      <Form.Field>
        <label>Abstract</label>
        <TextArea value={abstract} onChange={e => setAbstract(e.target.value)} placeholder="Abstract" />
      </Form.Field>
      <Form.Field>
        <label>Article Text</label>
        <TextArea value={text} onChange={e => setText(e.target.value)} placeholder="Write your article..." />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </Form.Field>
      <Form.Field>
        <label>Image Upload (Cloudinary)</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            setImage(e.target.files[0]);
            handleImageUpload(e.target.files[0]);
          }}
        />
        {uploading && <p>Uploading image...</p>}
        {imageUrl && <img src={imageUrl} alt="preview" style={{ maxWidth: "200px" }} />}
      </Form.Field>
      <PostButton onClick={handleSubmit} />
    </Form>
  );
}
export default ArticleForm;
