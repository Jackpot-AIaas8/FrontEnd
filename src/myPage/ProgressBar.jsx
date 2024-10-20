import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ProgressBar = ({ value }) => {
  const progress = (value / 121) * 100; // 300명을 기준으로 퍼센트 계산

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 , padding: "0 30px" }}>
      <Box sx={{ width: '200px', mr: 1 }}>
        <LinearProgress variant="determinate" value={progress}  sx={{ height: '5px'}}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>
  );
};
