export const styleButtonsTimer = (isButtonsDisable) => {
  return !isButtonsDisable ? buttonStyle : {...buttonStyle, opacity: 0.25};  
};

const buttonStyle = {
  width: '3.4rem',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};