import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

function Tutorials(props) {
  return (
    <div style={{ textAlign: "center", margin: "2em 0" }}>
      <h2>Featured Tutorials</h2>
      <Card.Group centered>
        {props.tutorials.map((t, i) => (
          <Card key={i} className="featured-card">
            <Image src={t.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{t.title}</Card.Header>
              <Card.Description>{t.desc}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="star" color="yellow" /> {t.rating} &nbsp; {t.user}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Button primary style={{ marginTop: "1em" }}>See all tutorials</Button>
    </div>
  );
};

export default Tutorials;
