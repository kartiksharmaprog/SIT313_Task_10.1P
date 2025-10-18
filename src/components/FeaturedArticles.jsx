import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

function FeaturedArticles(props){
  return (
    <div style={{ textAlign: "center", margin: "2em 0" }}>
      <h2>Featured Articles</h2>
      <Card.Group centered>
        {props.articles.map((a, i) => (
          <Card key={i} className="featured-card">
            <Image src={a.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{a.title}</Card.Header>
              <Card.Description>{a.desc}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="star" color="yellow" /> {a.rating} &nbsp; {a.author}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Button primary style={{ marginTop: "1em" }}>See all articles</Button>
    </div>
  );
};

export default FeaturedArticles;
