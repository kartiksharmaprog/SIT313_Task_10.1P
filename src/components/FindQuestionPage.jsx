import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {collection,query,orderBy,onSnapshot,deleteDoc,doc,} from "firebase/firestore";
import {Input,Card,Button,Label,Icon,} from "semantic-ui-react";
import "./FindQuestionPage.css";

function FindQuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        // Check for type "question"
        if (data.type === "question") {
          postsData.push({ id: docSnap.id, ...data });
        }
      });
      setQuestions(postsData);
      setFilteredQuestions(postsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = questions;

    if (searchTitle.trim()) {
      filtered = filtered.filter((q) => q.title.toLowerCase().includes(searchTitle.toLowerCase()));
    }

    if (searchTag.trim()) {
      filtered = filtered.filter((q) =>
        q.tags && q.tags.some((tag) => tag.toLowerCase().includes(searchTag.toLowerCase()))
      );
    }

    if (searchDate) {
      filtered = filtered.filter((q) => {
        const postDate = q.createdAt?.toDate
          ? q.createdAt.toDate()
          : new Date(q.createdAt);
        const filterDate = new Date(searchDate);
        return (
          postDate.getFullYear() === filterDate.getFullYear() && postDate.getMonth() === filterDate.getMonth() && postDate.getDate() === filterDate.getDate()
        );
      });
    }

    setFilteredQuestions(filtered);
  }, 
  
  [searchTitle, searchTag, searchDate, questions]);

  function toggleExpand(id){
    setExpandedIds((expanded) =>
      expanded.includes(id) ? expanded.filter((eid) => eid !== id)  : [...expanded, id]
    );
  };

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  return (
    <div className="find-questions-container">
      <h2>Find Questions</h2>

      <Input
        placeholder="Search title..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        className="find-questions-input" />

      <Input
        placeholder="Search tags..."
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        className="find-questions-input--small" />

      <Input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="find-questions-input--date"
      />

      <Card.Group>
        {filteredQuestions.map((q) => (
          <Card key={q.id} fluid>
            <Card.Content>
              <Card.Header
                onClick={() => toggleExpand(q.id)}
                className="find-questions-card-header"
              >
                {q.title}
                <Icon
                  name={expandedIds.includes(q.id) ? "angle up" : "angle down"}
                  className="find-questions-card-icon"/>
              </Card.Header>

              <Card.Meta>
                {q.createdAt?.toDate
                  ? q.createdAt.toDate().toLocaleDateString()
                  : new Date(q.createdAt).toLocaleDateString()}
              </Card.Meta>

              <Card.Description>
                {expandedIds.includes(q.id) ? q.description : (q.description || "").slice(0, 100) + "..."}
              </Card.Description>
              {q.imageUrl && (<img src={q.imageUrl} alt="Question" className="find-questions-image" />)
              }

              <div className="find-questions-tags">
                {(q.tags || []).map((tag, index) => (
                  <Label key={index} color="blue" className="find-questions-tag">
                    {tag}
                  </Label>
                ))}
              </div>

            </Card.Content>
            <Card.Content extra>
              <Button basic color="red" onClick={() => handleDelete(q.id)}>
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default FindQuestionPage;
