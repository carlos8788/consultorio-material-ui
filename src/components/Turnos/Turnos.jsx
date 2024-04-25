import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchTurnos } from '../../redux/turnosSlice';
import { useEffect } from 'react';
import Animations from './SkeletonTable';

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
        sortable: false,
        width: 200,
    },
];

export default function Turnos() {
    const dispatch = useDispatch();
    const turnos = useSelector(state => state.turnos);

    useEffect(() => {
        if (turnos.status === 'idle') {
            dispatch(fetchTurnos());
        }
    }, [dispatch, turnos.status]);

    if (turnos.status === 'loading') {
        return <Animations/>;
    }

    if (turnos.status === 'failed') {
        return <div>Error: {turnos.error}</div>;
    }

    if (!turnos.data || !turnos.data.turnos || turnos.data.turnos.length === 0) {
        return <div>No hay datos disponibles.</div>;
    }

    const rows = turnos.data.turnos.map((turno, i) => ({
        id: i + 1,
        hora: turno.hora,
        diagnostico: turno.paciente.observaciones || 'No hay datos',
        paciente: `${turno.paciente.nombre} ${turno.paciente.apellido}`,
        obraSocial: turno.paciente.obraSocial?.nombre
    })).sort((a, b) => a.hora.localeCompare(b.hora)); 

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
                disableRowSelectionOnClick
            />
        </Box>
    );
}
