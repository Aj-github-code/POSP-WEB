import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color= 'primary'
      value={alignment}
      exclusive
      onChange={handleAlignment}
      sx={{ height: '40px' }}
      aria-label="text alignment"
    >
      <ToggleButton value="quality_checker">
      Quality Checker
      </ToggleButton>
      <ToggleButton value="dealer">
      Dealer
      </ToggleButton>
      <ToggleButton value="assessor">
      Assessor
      </ToggleButton>
    </ToggleButtonGroup>
  );
}