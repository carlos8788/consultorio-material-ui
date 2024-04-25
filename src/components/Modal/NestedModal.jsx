import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addComment, cleanPaciente, getPaciente } from '../../redux/turnosSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { date } from '../../helpers/helpers';
import PopAlert from '../PopAlert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
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
  const [comentario, setComentario] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    if (openModal && user) {
      dispatch(getPaciente({ id: user.paciente }));
    }
  }, [openModal, user, dispatch]);

  const handleClose = () => {
    setOpenModal(false);
    dispatch(cleanPaciente());
  };

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handleSubmit = () => {
    user.fecha = date
    console.log({ ...user, comentario })
    dispatch(addComment({...user, comentario}))
    setComentario('');
    handleClose();
    setOpenAlert(true)
    setTimeout(()=> setOpenAlert(false), 3000)
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="parent-modal-title" variant="h5" component="h2" marginBottom={2}>
            {userState?.paciente.nombre} {userState?.paciente.apellido}
          </Typography>
          <Typography variant="h6">
            DNI: {userState?.paciente.dni}
          </Typography>
          <Typography variant="h6">
            Observaciones: {userState?.diagnostico || 'N/A'}
          </Typography>
          <Typography variant="h6" marginBottom={2}>
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
            value={comentario}
            onChange={handleComentarioChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <Button variant="contained" color='success' onClick={handleSubmit} >SUBMIT</Button>
            <Button variant="contained" onClick={handleClose} color='error'>Close</Button>
          </Box>
        </Box>
      </Modal>
      {openAlert && <PopAlert/>}
    </>

  );
}

NestedModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default NestedModal;
