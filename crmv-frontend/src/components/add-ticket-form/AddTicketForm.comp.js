import React from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import PropTypes from 'prop-types';
import './add-ticket-form.style.css'

export const AddTicketForm = ({handleOnSubmit, handleOnChange, frmDt, frmDataError}) =>{
    console.log(frmDt);
    
    return (
        <Container className="mt-3 add-new-tickets bg-light">
            <h1 className='text-info text-center'>Add New Ticket</h1>
            <hr/>
            <Form autoComplete="off" onSubmit={handleOnSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                        Subject
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control 
                        name="subject"
                        value={frmDt.subject}
                        onChange={handleOnChange}
                        placeholder="Subject"
                        required
                        />
                        <Form.Text className='text-danger'>
                            {frmDataError.subject && "Subject is required"}
                        </Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                        Issue Found
                    </Form.Label>
                    <Col sm={9}>
                    <Form.Control 
                    type="date"
                    name="issueDate"
                    value={frmDt.issueDate}
                    onChange={handleOnChange}
                    placeholder="Enter PassWord"
                    required
                    />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Issue</Form.Label>
                    <Form.Control 
                    as="textarea"
                    name="detail"
                    value={frmDt.detail}
                    rows="15"
                    onChange={handleOnChange}
                    placeholder="Enter Issue"
                    required
                    />
                </Form.Group>
                <Button type="submit" variant="info" block>
                    Login
                </Button>
            </Form>
        </Container>
    )
}

AddTicketForm.propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    frmDt: PropTypes.object.isRequired,
    frmDataError: PropTypes.object.isRequired
}
