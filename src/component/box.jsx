import React from 'react';


const Box = (props) => {
    const { ticket, users } = props;
    //console.log(ticket);
    const name = users.substring(0, 2);

    return (
        <>

            <div className='container' style={{
                margin: "30px",
                borderRadius: '20px',
                border: '1.5px  black',
                padding: '10px 20px 10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                background: 'white'
            }}>

                <div className='inner-top' style={{ display: 'flex' }}>
                    <div className='inner-top-left'>
                        <h2>{ticket.id}</h2>
                    </div>

                    <div className='inner-top-right' style={{ marginLeft: 'auto', padding: '2px', position: 'relative' }}>
                        {/*<img src="/logo192.png" alt="logo" style={{
                            height: '50px', width: '50px', border: '1px solid black', borderRadius: '50%', position: 'relative'
                        }} />
                    */}
                        <div style={{
                            height: '50px',
                            width: '50px',
                            border: '1px solid black',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'yellow',
                            justifyContent: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        }}>
                            {name}
                        </div>

                        <div className='overlap' style={{
                            position: 'absolute', bottom: '20%', right: 0, background: 'grey', width: '20px', height: '20px', borderRadius: '50%'
                        }}>
                        </div>
                    </div>
                </div>

                <div className='inner-title'>
                    <h3>{ticket.title}</h3>
                </div>

                <div className='inner-bottom' style={{
                    display: 'flex'
                }}>

                    <div className='bottom-icon' style={{
                        borderRadius: '10px', border: '1px solid grey'
                    }}>
                        <img src="https://static.thenounproject.com/png/4644823-200.png" alt="information"
                            style={{ width: '50px', height: '50px', padding: '5px', margin: '8px' }} />
                    </div>

                    <div className='bottom-right' style={{
                        display: 'flex', border: '1px groove black', marginLeft: '2%',
                        borderRadius: '10px', flexDirection: 'left'
                    }}>

                        <div style={{ padding: '10px 10px 10px' }}>
                            <div className='bottom-right-left' style={{
                                background: "grey", width: "50px", height: '50px', borderRadius: '50%'
                            }}>
                            </div>
                        </div>

                        <div className='bottom-right-text' style={{ marginInline: "7px", padding: '4px 6px 10px', textAlign: 'center', fontSize: '20px' }} >
                            <span>{ticket.tag} </span></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Box;