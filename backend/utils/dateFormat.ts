export const customDateFormat = (timestamp: Date): any => {
  // Convert the provided timestamp into a JavaScript Date object
  const date = new Date(timestamp);

  // Define formatting options for the date and time
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', // Display the full year (e.g., 2025)
    month: 'long', // Display the full month name (e.g., "March")
    day: 'numeric', // Display the day of the month as a number (e.g., 26)
    hour: '2-digit', // Display the hour in 2-digit format (e.g., 01 or 12)
    minute: '2-digit', // Display the minutes in 2-digit format (e.g., 05 or 45)
    second: '2-digit', // Display the seconds in 2-digit format (e.g., 09 or 59)
    hour12: true, // Use 12-hour format with AM/PM
  };

  // Format the date using the specified options and return it as a string
  return date.toLocaleString('en-US', options);
};