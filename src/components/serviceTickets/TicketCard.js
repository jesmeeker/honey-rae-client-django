import React from "react"
import { TicketHeader } from "./TicketHeader"
import { TicketBody } from "./TicketBody"
import { TicketFooter } from "./TicketFooter"
import "./Tickets.css"

export const TicketCard = ({ ticket, toggle , setOriginal}) => {
    return <section className={`ticket ${ticket.emergency ? 'emergency' : ''}`}>

        <TicketHeader ticket={ticket} />
        <TicketBody ticket={ticket} toggle={toggle} />
        <TicketFooter ticket={ticket} setOriginal={setOriginal}/>
    </section>
}
