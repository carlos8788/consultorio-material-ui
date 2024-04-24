import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { fetchTurnos } from '../../redux/turnosSlice';
import useService from '../../services/api'
import { useEffect } from 'react';
import { useState } from 'react';

const columns = [
    // { field: 'id', headerName: 'ID', width: 60, editable: false },
    {
        field: 'paciente',
        headerName: 'Paciente',
        type: 'string',
        width: 200,
        editable: true,
    },
    {
        field: 'hora',
        headerName: 'Hora',
        width: 90,
        editable: true,
    },
    {
        field: 'diagnostico',
        headerName: 'Motivo',
        // description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
    },
];

export default function Turnos() {
    // const dispatch = useDispatch();
    const [turnos, setTurnos] = useState([])
    // const turnos = useSelector(state => state.turnos)
    useEffect(() => {
        useService
            .getTurnos()
            .then(data => setTurnos(data.turnos))

        // dispatch(fetchTurnos())
    }, [])
    // return (<>Hola mundo</>)
    const rows = turnos.map((turno, i) => {
        return {
            id: i+1,
            hora: turno.hora,
            diagnostico: turno.paciente.observaciones || 'no hay datos',
            paciente: `${turno.paciente.nombre} ${turno.paciente.apellido}`,
            obraSocial: turno.paciente.obraSocial?.nombre
        }
    })
    return (
        <Box sx={{
            height: '100%', 
            width: '100%',
            '.MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#FDC6FF',
            },
            '.MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#f0f0f0',
            }
        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}