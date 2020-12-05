import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Item table. See pages/ListItem.jsx. */
class ItemItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.Item.name}</Table.Cell>
          <Table.Cell>{this.props.Item.quantity}</Table.Cell>
          <Table.Cell>{this.props.Item.condition}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.Item._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ItemItem.propTypes = {
  Item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ItemItem);
