import React, {useEffect, useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {AddTicketForm} from '../../components/add-ticket-form/AddTicketForm.comp';
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb.comp';
import {shortText} from '../../utils/validation.js'

const initialFrmDt = {
    subject: "",
    issueDate: "",
    detail: "",
};
const initialFrmError = {
    subject: false,
    issueDate: false,
    detail: false,
};  

export const AddTicket = () =>{
    const [frmData, setFrmData] = useState(initialFrmDt); 
    const [frmDataError, setErrorDataError] = useState(initialFrmError);
    useEffect(() => {}, [frmData, frmDataError])
    //forgot what this does, maybe it will become clear later

    const handleOnChange = (e) => {
        const {name, value} = e.target
        
        setFrmData({
            ...frmData,
            [name]: value,
        });
    };  

    const handleOnSubmit = async(e) =>{
        e.preventDefault()

        setErrorDataError(initialFrmError)
        const isSubjectValid = await shortText(frmData.subject)
        // no need for await here, but for now just know it exists lol

        setErrorDataError({
            ...initialFrmError,
            subject: !isSubjectValid,
        });

        console.log('Form submit request received')
    }

    return (
        <Container>
            <Row>
                <Col>
                <PageBreadcrumb page="New Ticket"/>
                </Col>
            </Row>

            <Row>
                <Col>
                <AddTicketForm 
                handleOnChange={handleOnChange} 
                handleOnSubmit={handleOnSubmit}
                frmDt={frmData}
                frmDataError={frmDataError}
                />
                </Col>
            </Row>
        </Container>
    )
}