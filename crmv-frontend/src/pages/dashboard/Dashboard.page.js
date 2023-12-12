import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Container, Row, Col, Button} from 'react-bootstrap'
import {TicketTable} from '../../components/ticket-table/TicketTable.comp';
import tickets from '../../assets/data/dummy-tickets.json'
import {PageBreadcrumb} from '../../components/breadcrumb/Breadcrumb.comp';
import { Link, redirect } from 'react-router-dom';
import { fetchAllTickets } from "../ticket-list/ticketsAction";

export const Dashboard = () =>{
    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.tickets);
  
    useEffect(() => {
      if (!tickets.length) {
        dispatch(fetchAllTickets());
      }
    }, [tickets, dispatch]);
  
    const pendingTickets = tickets.filter((row) => row.status !== "Closed");
    const totlatTickets = tickets.length;
    return (
        <Container>
            <Row>
                <PageBreadcrumb page="Dashboard"/>    
            </Row>
            <Row>
                <Col className="text-center mt-4 mb-2">
                    <Link to="/add-ticket">
                        <Button variant="info" text
                        style={{
                            'fontSize':'2rem', 
                            padding: '10px 30px',
                            color: "white"
                        }}>
                            Add New Ticket
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <div>Total tickets: {totlatTickets}</div>
                    <div>Pending tickets: {pendingTickets.length}</div>
                </Col>
            </Row>
            <Row>
                <Col className="mt-4">
                    Recently added tickets
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col className="recent-ticket">
                    <TicketTable tickets={tickets}/>
                </Col>
            </Row>
        </Container>
    );
};