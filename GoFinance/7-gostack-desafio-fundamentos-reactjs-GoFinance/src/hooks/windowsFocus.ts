/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';

// User has switched back to the tab
const onFocus = (): void => {
  console.log('Tab is in focus');
};

// User has switched away from the tab (AKA tab is hidden)
const onBlur = (): void => {
  console.log('Tab is blurred');
};

const WindowFocusHandler = (): void => {
  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);
};

export default WindowFocusHandler;
