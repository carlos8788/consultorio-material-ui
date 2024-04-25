import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { cleanPaciente, getPaciente } from '../../redux/turnosSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function NestedModal({ openModal, setOpenModal, user }) {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.turnos.currentUser);

  useEffect(() => {
    if (openModal && user) {
      dispatch(getPaciente({ id: user }));
    }
  }, [openModal, user, dispatch]);

  const handleClose = () => {
    setOpenModal(false);
    dispatch(cleanPaciente()); 
  };

  const handlePaciente = () => {
    dispatch(getPaciente({ id: user }));
    console.log(userState)
  };

  return (
<div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="parent-modal-title" variant="h6" component="h2" marginBottom={2}>
            {userState?.paciente.nombre} {userState?.paciente.apellido}
          </Typography>
          <Typography variant="subtitle1">
            DNI: {userState?.paciente.dni}
          </Typography>
          <Typography variant="subtitle1">
            Observaciones: {userState?.diagnostico || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" marginBottom={2}>
            Obra Social: {userState?.paciente.obraSocial.nombre}
          </Typography>
          <TextField
            fullWidth
            id="comment"
            label="Comentario"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <Button variant="contained" onClick={handlePaciente}>SUBMIT</Button>
            <Button variant="outlined" onClick={handleClose} color='error'>Close</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

NestedModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  user: PropTypes.string
};

export default NestedModal;
