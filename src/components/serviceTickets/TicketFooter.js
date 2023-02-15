import React, { useCallback } from "react"
import "./Tickets.css"
import { isStaff } from "../../utils/isStaff"
import { fetchIt } from "../../utils/fetchIt"

export const TicketFooter = ({ ticket, setOriginal }) => {

    const fetchTickets = useCallback(() => {
        return fetchIt("http://localhost:8000/tickets")
            .then((tickets) => {
                setOriginal(tickets)
            })
            .catch(() => setOriginal([]))
        })

    const updateTicket = (date) => {

        const updatedTicket = {...ticket, employee: ticket.employee.id, customer: ticket.customer.id, date_completed: date}

        fetchIt(
            `http://localhost:8000/tickets/${ticket.id}`,
            {
                method: "PUT",
                body: JSON.stringify(updatedTicket)
            }
            ).then(fetchTickets)
    }

    const ticketStatus = () => {
        
        if (ticket.date_completed === null) {
            if (ticket.employee) {
                if (isStaff() === true) {
                    return <>
                    <span className="status--in-progress">In progress</span>
                    <button onClick={() => {
                        const date = Date.now()
                        const new_date = new Date(date)
                        const date_string = new_date.toLocaleDateString('en-CA', {year: "numeric", month: "numeric", day: "numeric"})
                        updateTicket(date_string)
                        }
                    }>Mark Done</button>
                </>
                }
                return <span className="status--in-progress">In progress</span>
            }
            return <span className="status--new">Unclaimed</span>
        }
        return <span className="status--completed">Done</span>
    }

    return <footer className="ticket__footer">
        <div className="ticket__employee">
            {
                ticket.date_completed === null
                    ? `Assigned to ${ticket?.employee?.full_name ?? "no one, yet"}`
                    : `Completed by ${ticket?.employee?.full_name} on ${ticket.date_completed}`
            }
        </div>
        <div> {ticketStatus()} </div>
    </footer>
}
