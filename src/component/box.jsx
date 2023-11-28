import React from 'react';
import './Box.css';


const Box = (props) => {
    const { ticket, users } = props;
    //console.log(ticket);
    const name = users.substring(0, 2);

    return (
        <>

            <div className='container'>

                <div className='inner-top'>
                    <div className='inner-top-left'>
                        <h2>{ticket.id}</h2>
                    </div>

                    <div className='inner-top-right' style={{ marginLeft: 'auto', padding: '2px', position: 'relative' }}>
                        {/*<img src="/logo192.png" alt="logo" style={{
                            height: '50px', width: '50px', border: '1px solid black', borderRadius: '50%', position: 'relative'
                        }} />
                    */}
                        <div className="mid">
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
                            style={{ width: '30px', height: '30px', padding: '4px', margin: '8px' }} />
                    </div>

                    <div className='bottom-right' style={{
                        display: 'flex', border: '1px groove black', marginLeft: '2%',
                        borderRadius: '10px', flexDirection: 'left'
                    }}>

                        <div style={{ padding: '10px 10px 10px' }}>
                            <div className='bottom-right-left' style={{
                                background: "grey", width: "40px", height: '40px', borderRadius: '50%'
                            }}>
                            </div>
                        </div>

                        <div className='bottom-right-text' style={{ marginInline: "7px", padding: '4px 6px 10px',marginTop:'5%', textAlign: 'center', fontSize: '18px' }} >
                            <span>{ticket.tag} </span></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Box;