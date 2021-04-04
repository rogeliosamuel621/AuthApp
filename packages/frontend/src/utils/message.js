export function ErrorHandler(setMessage, message) {
  setMessage({ msg: message, status: true });
  document.getElementById('errorMessage').classList.remove('HideMessage');
  document.getElementById('errorMessage').classList.add('ShowMessage');
  setTimeout(() => {
    document.getElementById('errorMessage').style.top = '29px';
  }, 500);
}

export function SuccessMessage(setError, message) {
  setError({ msg: message, status: false });
  document.getElementById('errorMessage').classList.remove('HideMessage');
  document.getElementById('errorMessage').classList.add('ShowMessage');
  setTimeout(() => {
    document.getElementById('errorMessage').style.top = '29px';
  }, 500);
}
