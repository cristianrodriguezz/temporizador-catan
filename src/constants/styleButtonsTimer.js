export const styleButtonsTimer = (isButtonsDisable) => {
  return !isButtonsDisable ? buttonStyle : {...buttonStyle, opacity: 0.25};  
};

const buttonStyle = {
  width: '3rem',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};