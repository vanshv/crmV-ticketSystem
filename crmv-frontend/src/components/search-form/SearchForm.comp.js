import React from 'react';
import { useDispatch } from 'react-redux';
import { filterSerachTicket } from '../../pages/ticket-list/ticketsAction';

import { Form, Row, Col } from 'react-bootstrap';

export const SearchForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;

    dispatch(filterSerachTicket(value));
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Search:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="searchStr"
              onChange={handleOnChange}
              placeholder="..."
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};
