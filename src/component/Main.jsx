import React, { useState, useEffect } from 'react';
import Box from './box';
import UserBased from './PriorityBased';


const Main= () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupingOption, setGroupingOption] = useState('status');
    const [sortOption, setSortOption] = useState('priority');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsers(data.users);
                setTickets(data.tickets);
            })
    }


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
                        ? ticket.user
                        : ticket.priority;
            if (!groupedTickets[groupKey]) {
                groupedTickets[groupKey] = [];
            }
            groupedTickets[groupKey].push(ticket);
        });

        return groupedTickets;
    };

    const ticketGroups = Object.entries(getSortedAndGroupedTickets());

    const getPriorityStyle = (priorityLevel) => {
        switch (priorityLevel) {
            case '4':
                return { label: 'Urgent', imageSrc: 'https://cdn.vectorstock.com/i/preview-1x/51/06/network-signal-bar-icon-in-modern-design-style-vector-26505106.jpg' }
            case '3':
                return { label: 'High', imageSrc: 'https://static.thenounproject.com/png/208053-200.png' }

            case '2':
                return { label: 'Medium', imageSrc: 'https://static.thenounproject.com/png/630500-200.png' }

            case '1':
                return { label: 'Low', imageSrc: 'https://static.thenounproject.com/png/269790-200.png' }

            default:
                return { label: 'No-priority', imageSrc: 'https://i.stack.imgur.com/twIm6.png' }

        }
    };

    //console.log(users);
    //console.log(tickets);

    function matchingUser(userid) {
        for (var j = 0; j < users.length; j++) {
            if (users[j].id === userid) {
                return users[j].name;
            }
        }
    }

    //check if user option is chosen or not
    let isUser = true;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div style={{ background: '#ececf8', padding: '20px 20px' }}>
                <nav style={{ display: 'flex', marginInline: '10%' }}>
                    <div style={{}} >
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black' }}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/70/70115.png"
                                alt="setting"
                                style={{ width: '20px', height: '20px', padding: '5px' }}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                            <p style={{ fontSize: '20px', margin: '0' }}>Display</p>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                style={{ marginLeft: '10px', border: 'none', background: 'none', cursor: 'pointer' }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/25/25623.png"
                                    alt="arrow"
                                    style={{ height: '20px', width: '10px', marginRight: '40%' }}
                                />
                            </button>

                        </div>

                        {isOpen && (
                            <div style={{ position: 'absolute', border: '1px solid grey', padding: '14px', borderRadius: '8px', background: 'white' }}>
                                <div style={{ marginRight: '10px', marginBottom: '10px' }}>
                                    <span style={{ marginInline: '10px' }}>Ordering</span>
                                    <button onClick={() => handleGroupingChange('status')} style={{ marginRight: '10px', background: 'white', borderRadius: '8px' }}>Status</button>
                                    <button onClick={() => handleSortChange('title')} style={{ background: 'white', borderRadius: '8px' }}>Title</button>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <span style={{ marginInline: '10px' }}>Ordering</span>
                                    <button onClick={() => handleGroupingChange('user')} style={{ marginRight: '10px', background: 'white', borderRadius: '8px' }}>User</button>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <span style={{ marginInline: '10px' }}>Ordering</span>
                                    <button onClick={() => handleGroupingChange('priority')} style={{ marginRight: '10px', background: 'white', borderRadius: '8px' }}>Priority</button>
                                </div>
                                <div style={{ position: 'absolute', top: '-15px', left: '50%', marginLeft: '-15px' }}>
                                    <div style={{ width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '15px solid grey' }} />
                                </div>
                            </div>
                        )}


                    </div>
                </nav>
            </div>

            <div>
                <button onClick={() => handleSortChange('priority')} style={{ visibility: 'hidden' }}></button>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ticketGroups.length}, 1fr)` }}>
                {ticketGroups.map(([groupKey]) => {

                    const priorityStyle = getPriorityStyle((groupKey));
                    console.log(groupKey);
                    if (!isNaN(groupKey)) {


                        return (
                            <React.Fragment key={groupKey}>
                                {/*based on priority */}
                                <div className={`priority ${priorityStyle.className}`} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={priorityStyle.imageSrc} alt={priorityStyle.className} style={{ height: '20px', width: '20px', marginLeft: '10%' }} />
                                    <p style={{ marginTop: '1px', marginLeft: '3%' }}>{priorityStyle.label} {groupKey}</p>


                                    <img src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-add-icon-png-image_956621.jpg" alt='add'
                                        style={{ height: '20px', width: '20px', marginLeft: 'auto' }} />
                                    <img src="https://i.stack.imgur.com/twIm6.png" alt="dot" style={{ height: '20px', width: '20px', marginRight: '20px' }} />
                                </div>
                            </React.Fragment>
                        );
                    }

                    else if (groupKey === 'Todo' || groupKey === 'In progress' || groupKey === 'Backlog') {
                        return (
                            <React.Fragment key={groupKey}>
                                {/*based on status */}
                                <div className={`priority ${priorityStyle.className}`} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={priorityStyle.imageSrc} alt={priorityStyle.className} style={{ height: '20px', width: '20px', marginLeft: '10%' }} />
                                    <p style={{ marginTop: '1px', marginLeft: '3%' }}>{groupKey}</p>


                                    <img src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-add-icon-png-image_956621.jpg" alt='add'
                                        style={{ height: '20px', width: '20px', marginLeft: 'auto' }} />
                                    <img src="https://i.stack.imgur.com/twIm6.png" alt="dot" style={{ height: '20px', width: '20px', marginRight: '20px' }} />
                                </div>
                            </React.Fragment>
                        );
                    }
                    else {
                        {/*Based on User */ }
                        isUser = false;
                        return (
                            <UserBased />
                        )
                    }
                })}

                {isUser ? (
                    // Render this block if isUser is True
                    ticketGroups.map(([groupKey, groupTickets]) => (
                        <React.Fragment key={groupKey}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {groupTickets.map((ticket) => (
                                    <Box key={ticket.id} ticket={ticket} users={matchingUser(ticket.userId)} />
                                ))}
                            </div>
                        </React.Fragment>
                    ))
                ) : null}
            </div>
        </div>
    );
};

export default Main;
