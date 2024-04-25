import { Typography} from '@mui/material';
import { date } from '../../helpers/helpers';
import Turnos from '../../components/Turnos/Turnos';
const Home = () => {
    return (
        <>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                Turnos : {date}
            </Typography>
            <Turnos/>
        </>
    )
}
export default Home