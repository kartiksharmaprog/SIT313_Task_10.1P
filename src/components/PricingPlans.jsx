import React from 'react';
import { Card, Button, Icon, Container, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function PricingPlans() {
  const navigate = useNavigate();

  function selectPlan (plan){
    if (plan === 'premium') {
      navigate('/payment');
    } else {
      alert("You have selected the Free Plan. Enjoy basic features!");
    }
  };

  const plans= [
    {
      name: 'Free Plan',price: '$0',period: 'forever',
      features: [
        'Basic question posting',
        'Community access',
        'Standard themes',
        'Basic search functionality'
      ],
      buttonText: 'Get Started',
      color: 'green'
    },
    {
      name: 'Premium Plan',
      price: '$9.99',
      period: 'per month',
      features: [
        'Advanced code editor with syntax highlighting',
        'Custom themes and branding',
        'Analytics dashboard',
        'Priority support',
        'Ad-free experience',
        'Advanced search filters'
      ],
      buttonText: 'Subscribe Now',
      color: 'blue',
      popular: true
    }
  ];

  return (
    <Container style={{ padding: '2em 0' }}>
      <Header as='h1' textAlign='center' style={{ marginBottom: '2em' }}>
        Choose Your Plan
      </Header>
      
      <Card.Group itemsPerRow={2} stackable centered>
        {plans.map((plan, index) => (
          <Card key={index} color={plan.color} raised={plan.popular}>
            {plan.popular && (
              <Segment attached='top' color='blue' inverted textAlign='center'>
                <Icon name='star' /> MOST POPULAR
              </Segment>
            )}
            <Card.Content>
              <Card.Header textAlign='center'>{plan.name}</Card.Header>
              <Card.Meta textAlign='center'>
                <span style={{ fontSize: '2em', fontWeight: 'bold' }}>
                  {plan.price}
                </span>
                <span style={{ color: '#666' }}>/{plan.period}</span>
              </Card.Meta>
              <Card.Description>
                <div style={{ marginTop: '1em' }}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} style={{ margin: '0.5em 0' }}>
                      <Icon name='check' color='green' /> {feature}
                    </div>
                  ))}
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button 
                fluid 
                color={plan.color} 
                size='large'
                onClick={() => selectPlan(plan.name.toLowerCase().includes('premium') ? 'premium' : 'free')}>
                {plan.buttonText}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default PricingPlans;