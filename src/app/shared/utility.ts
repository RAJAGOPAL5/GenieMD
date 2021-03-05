export const getUserPreferedTheme  = () => {
    let theme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      theme = 'dark';
    } else {
      theme = 'default';
    }
    return localStorage.getItem('theme') || theme;
}
export const getTimeRange = (fromDate, toDate, type) => {
  console.log('dates', fromDate, toDate, type)
}