export const styleButtonsTimer = (isButtonsDisable) => {
  return !isButtonsDisable ? buttonStyle : {...buttonStyle, opacity: 0.25};  
};

const buttonStyle = {
  width: '5rem',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5rem'
};