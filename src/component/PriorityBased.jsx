import React, { useState, useEffect } from 'react';
import Box from './box' 

const UserBased = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupingOption, setGroupingOption] = useState('user');
    const [sortOption, setSortOption] = useState('priority');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then(response => response.json())
            .then(data => {
                setUsers(data.users);
                setTickets(data.tickets);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleGroupingChange = (option) => {
        setGroupingOption(option);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const getSortedAndGroupedTickets = () => {
        // Sort the tickets based on the selected option
        const sortedTickets = [...tickets].sort((a, b) => {
            if (sortOption === 'priority') {
                return b.priority - a.priority;
            } else if (sortOption === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

        // Group the tickets based on the selected grouping option
        const groupedTickets = {};
        sortedTickets.forEach((ticket) => {
            const groupKey =
                groupingOption === 'status'
                    ? ticket.status
                    : groupingOption === 'user'
                        ? matchingUser(ticket.userId)
                        : ticket.priority;

            if (!groupedTickets[groupKey]) {
                groupedTickets[groupKey] = [];
            }
            groupedTickets[groupKey].push(ticket);
        });

        return groupedTickets;
    };

    const matchingUser = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : '';
    };

    const ticketGroups = Object.entries(getSortedAndGroupedTickets());

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <button onClick={() => handleGroupingChange('user')} style={{visibility:"hidden"}}>Group by User</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ticketGroups.length}, 1fr)` }}>
                {ticketGroups.map(([groupKey, groupTickets]) => (
                    <React.Fragment key={groupKey}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            
                            <div style={{ display: 'flex'}}>                           
                             <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="users" 
                            style={{ height: '20px', width: '20px',marginLeft:"7%" }} />
                            <p style={{ marginTop: '1px',marginLeft:"2%" }}> {groupKey}</p>
                            <img src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-add-icon-png-image_956621.jpg" alt='add'
                                style={{ height: '20px', width: '20px', marginLeft: 'auto'}} />
                            <img src="https://i.stack.imgur.com/twIm6.png" alt="dot" style={{ height: '20px', width: '20px', marginRight: '20px'}} />
                            </div>

                            {groupTickets.map((ticket) => (
                                <Box key={ticket.id} ticket={ticket} users={matchingUser(ticket.userId)} />
                            ))}
                        </div>

                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default UserBased;
