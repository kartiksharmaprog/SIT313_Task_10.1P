import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import TagInput from "./TagInput";
import PostButton from "./PostButton";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';

function QuestionForm() {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [code, setCode] = useState("");
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
    return json.secure_url;
  }

  async function handleSubmit() {
    let finalImageUrl = imageUrl;
    if (image && !imageUrl) {
      finalImageUrl = await handleImageUpload(image);}
    
    if (title.trim() && problem.trim()) {
      await addDoc( collection(db, "posts"), {type: "question",title: title.trim(),description: problem.trim(),code: code.trim(),tags: tags,imageUrl: finalImageUrl,createdAt: new Date(),});
      
      // Reset form
      setTitle("");
      setProblem("");
      setCode("");
      setTags([]);
      setImage(null);
      setImageUrl("");
      alert("Question posted successfully!");
    } else {
      alert("Please fill in all required fields.");}
  }

  return (
    <Form>
      <Form.Field>
        <label>Title</label>
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Question Title" 
        />
      </Form.Field>
      
      <Form.Field>
        <label>Description</label>
        <textarea 
          value={problem} 
          onChange={e => setProblem(e.target.value)} 
          rows={5} 
          placeholder="Describe your problem" 
        />
      </Form.Field>

      <Form.Field>
        <label>Code Snippet (Optional)</label>
        <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
          <CodeMirror
            value={code}
            options={{mode: 'javascript',theme: 'material',lineNumbers: true,lineWrapping: true, indentUnit: 2, tabSize: 2}}
            onBeforeChange={(editor, data, value) => {setCode(value);}} />
        </div>
      </Form.Field>

      <Form.Field>
        <label>Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </Form.Field>
      
      <Form.Field>
        <label>Upload Image (Cloudinary)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setImage(e.target.files[0])} 
        />
        {uploading && <p>Uploading...</p>}
        {imageUrl && (
          <img 
            src={imageUrl} 
            style={{ maxWidth: "200px", marginTop: "10px" }} 
            alt="Upload preview" 
          />
        )}
      </Form.Field>
      
      <PostButton onClick={handleSubmit}>Post Question</PostButton>
    </Form>
  );
}

export default QuestionForm;