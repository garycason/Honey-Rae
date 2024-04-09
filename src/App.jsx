import { useEffect, useState } from "react";
import { getAllTickets } from "./services/ticketService.jsx";
import "./app.css";

export const App = () => {
  const [allTickets, setAllTicketsData] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);//we must give use
  //state an initial value of what we expect that state to be.

  useEffect(() => {
    getAllTickets().then(ticketsArray => {
      setAllTicketsData(ticketsArray);
      console.log("tickets set!");
    });
  }, []); // runs only on initial render of component

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true);
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]); // added allTickets to the dependency array

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div>
        <button className="filter-btn btn-primary" onClick={() => setShowEmergencyOnly(true)}>
          Emergency
        </button>
      </div>
      <div>
        <button className="filter-btn btn-info" onClick={() => setShowEmergencyOnly(false)}>
          Show All
        </button>
      </div>
      <article className="tickets">
        {filteredTickets.map(ticket => {
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info"># {ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket-info">Emergency</div>
                  <div>{ticket.emergency ? "Yes" : "No"}</div>
                </div>
              </footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
