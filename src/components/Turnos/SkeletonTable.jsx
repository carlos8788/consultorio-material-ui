import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: 400 }}>
      <Skeleton variant='rectangular' width={350} height={70}/>
      {Array.from(new Array(20)).map((_, index) => (
        <Skeleton key={index} animation="wave" width={350} height={50} />
      ))}
    </Box>
  );
}