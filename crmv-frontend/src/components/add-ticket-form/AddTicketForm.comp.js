import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form, 
    Button, 
    Row, 
    Col, 
    Container,
    Spinner,
    Alert,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import './add-ticket-form.style.css'
import { openNewTicket } from "./addTicketAction";
import { shortText } from "../../utils/validation";
import { restSuccessMSg } from "./addTicketSlicer";

const initialFrmDt = {
    subject: "",
    issueDate: "",
    message: "",
};
const initialFrmError = {
    subject: false,
    issueDate: false,
    message: false,
};
  
  export const AddTicketForm = () => {
    const dispatch = useDispatch();
  
    const {
      user: { name },
    } = useSelector((state) => state.user);
  
    const { isLoading, error, successMsg } = useSelector(
      (state) => state.openTicket
    );
  
    const [frmData, setFrmData] = useState(initialFrmDt);
    const [frmDataErro, setFrmDataErro] = useState(initialFrmError);
    
    useEffect(() => {
        return () => {
          successMsg && dispatch(restSuccessMSg());
        };
      }, [dispatch, frmData, frmDataErro]);
  
    const handleOnChange = (e) => {
      const { name, value } = e.target;
  
      setFrmData({
        ...frmData,
        [name]: value,
      });
    };
  
    const handleOnSubmit = async (e) => {
      e.preventDefault();
  
      setFrmDataErro(initialFrmError);
  
      const isSubjectValid = await shortText(frmData.subject);
  
      setFrmDataErro({
        ...initialFrmError,
        subject: !isSubjectValid,
      });
  
      dispatch(openNewTicket({ ...frmData, sender: name }));
    };
    
    return (
        <Container className="mt-3 add-new-tickets bg-light">
            <h1 className='text-info text-center'>Add New Ticket</h1>
            <hr/>
            <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="primary">{successMsg}</Alert>}
        {isLoading && <Spinner variant="primary" animation="border" />}
              </div>
            <Form autoComplete="off" onSubmit={handleOnSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                        Subject
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control 
                        name="subject"
                        value={frmData.subject}
                        onChange={handleOnChange}
                        placeholder="Subject"
                        required
                        />
                        <Form.Text className='text-danger'>
                            {frmDataErro.subject && "Subject is required"}
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
                    value={frmData.issueDate}
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
                    name="message"
                    value={frmData.message}
                    rows="15"
                    onChange={handleOnChange}
                    placeholder="Enter Issue"
                    required
                    />
                </Form.Group>
                <Button type="submit" variant="info" block>
                    Open Ticket
                </Button>
            </Form>
        </Container>
    )
}

// AddTicketForm.propTypes = {
//     handleOnSubmit: PropTypes.func.isRequired,
//     handleOnChange: PropTypes.func.isRequired,
//     frmData: PropTypes.object.isRequired,
//     frmDataErro: PropTypes.object.isRequired
// }
