import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchTurnos } from '../../redux/turnosSlice';
import { useEffect } from 'react';
import Animations from './SkeletonTable';
import NestedModal from '../Modal/NestedModal';
import { useState } from 'react';

const columns = [
    // { field: 'id', headerName: 'ID', width: 60, editable: false },
    {
        field: 'paciente',
        headerName: 'Paciente',
        type: 'string',
        width: 280,
        editable: true,
    },
    {
        field: 'hora',
        headerName: 'Hora',
        width: 80,
        editable: true,
    }
];
export default function Turnos() {
    const dispatch = useDispatch();
    const turnos = useSelector(state => state.turnos);
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (turnos.status === 'idle') {
            dispatch(fetchTurnos());
        }
    }, [dispatch, turnos.status]);
    
    const handleCellClick = (data) => {
        setOpenModal(true);
        setUser(data);
    };

    if (turnos.status === 'loading') {
        return <Animations />;
    }

    if (turnos.status === 'failed') {
        return <div>Error: {turnos.error}</div>;
    }

    if (!turnos.data || !turnos.data.turnos || turnos.data.turnos.length === 0) {
        return <div>No hay datos disponibles.</div>;
    }

    const rows = turnos.data.turnos.map(turno => ({
        id: turno.paciente._id,
        hora: turno.hora,
        paciente: `${turno.paciente.nombre} ${turno.paciente.apellido}`,
        diagnostico: turno.paciente.observaciones || 'No hay datos',
        obraSocial: turno.paciente.obraSocial?.nombre,
        // pacienteId: turno.paciente._id
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
                        pageSize: 20,
                    },
                }}
                sx={
                    {
                        fontSize: '20px',
                    }
                }
                pageSizeOptions={[20]}
                onCellClick={(e) => handleCellClick({paciente: e.id, hora: e.row.hora})}
            />
            <NestedModal openModal={openModal} setOpenModal={setOpenModal} user={user} />
        </Box>
    );
}