import React from "react";
import { Grid, List, Icon } from "semantic-ui-react";

function Footer() {
  return (
    <div style={{ background: "#007d8c", color: "white", padding: "2em" }}>
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <h4>Explore</h4>
            <List link inverted>
              <List.Item as="a" href="/">Home</List.Item>
              <List.Item as="a" href="/questions">Questions</List.Item>
              <List.Item as="a" href="/articles">Articles</List.Item>
              <List.Item as="a" href="/tutorials">Tutorials</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column>
            <h4>Support</h4>
            <List link inverted>
              <List.Item as="a" href="/faqs">FAQs</List.Item>
              <List.Item as="a" href="/help">Help</List.Item>
              <List.Item as="a" href="/contact">Contact Us</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column>
            <h4>Stay connected</h4>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              title="Follow us on Facebook"
            >
              <Icon name="facebook" size="large" link style={{ color: "white" }} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              title="Follow us on Twitter"
            >
              <Icon name="twitter" size="large" link style={{ color: "white" }} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              title="Follow us on Instagram"
            >
              <Icon name="instagram" size="large" link style={{ color: "white" }} />
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div style={{ textAlign: "center", marginTop: "2em" }}>
        <p>DEV@Deakin 2025</p>
        <p>Privacy Policy | Terms | Code of Conduct</p>
      </div>
    </div>
  );
}

export default Footer;
