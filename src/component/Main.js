import React from 'react'
import './main.css'


function Main() {

    let modalDiv;

    const [rowData, setRowData] = React.useState([{
        name: 'Rahul',
        location: 'Pune'
    }])
    let nameRef = React.useRef('');
    let locationRef = React.useRef('');
    const [name, setName] = React.useState('')
    const [location, setLocation] = React.useState('');
    const [modal, setModal] = React.useState(false);
    const [selectedTableData, setSelectedTableData] = React.useState({})


    const onSubmit = (e) => {
        e.preventDefault();
        setRowData([...rowData, { name: name, location: location }]);
        nameRef.current.value = ''
        locationRef.current.value = ''
        setName('');
        setLocation('')
    }

    const handleDelete = (e, index) => {
        e.stopPropagation()
        let newRows = [...rowData];
        newRows.splice(index, 1);
        setRowData(newRows)
    }

    const handleRowClick = (tableRow) => {
        setModal(true);
        setSelectedTableData(tableRow)
    }

    if (modal) {
        modalDiv =
            <div style={{
                marginLeft: '25%',
                width: '50%',
                height: '40%',
                position: 'absolute',
                top: '50%',
                bottom: '50%',
                transform: 'translate(-0%,-100%)',
                // zIndex: '2',
                backgroundColor: 'cyan'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
                    <div>
                        <span>Name: </span>
                        <h2 style={{ display: 'inline-block' }}>{selectedTableData.name}</h2>
                    </div>
                    <div>
                        <span>Location: </span>
                        <h2 style={{ display: 'inline-block' }}>{selectedTableData.location}</h2>
                    </div>

                </div>
                <button onClick={() => setModal(false)}>
                    colse
                </button>
            </div>
    }



    return (
        <>
            {modalDiv}
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        ref={nameRef}
                    />
                    <input type="text" placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                        ref={locationRef}

                    />
                    <button type="submit" disabled={!name || !location}>Add</button>
                </form>

                <div
                    style={{
                        paddingTop: '30px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <table style={{ border: '1px solid', width: '50%', }}>
                        <tr>
                            <th>name</th>
                            <th>location</th>
                            <th>Action</th>
                        </tr>
                        {rowData?.map((row, i) => (
                            <tr
                                className='tableRow'
                                onClick={() => handleRowClick(row)}
                            >
                                <td >{row.name}</td>
                                <td>{row.location}</td>
                                <td>
                                    <button
                                        onClick={(e) => handleDelete(e, i)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

            </div>
        </>

    )
}

export default Main