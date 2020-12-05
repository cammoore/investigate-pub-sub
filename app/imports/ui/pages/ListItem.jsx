import React from 'react';
import { Meteor } from 'meteor/meteor';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import ItemItem from '../components/ItemItem';

// expireLimit set to 30 minutes because: why not.
const globalSubs = new SubsManager({ expireIn: 30 });

/** Renders a table containing all of the Item documents. Use <ItemItem> to render each row. */
class ListItem extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Item</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.Items.map((Item) => <ItemItem key={Item._id} Item={Item} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Item documents in the props. */
ListItem.propTypes = {
  Items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Item documents.
  const subscription = globalSubs.subscribe(Items.userPublicationName);
  return {
    Items: Items.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListItem);
