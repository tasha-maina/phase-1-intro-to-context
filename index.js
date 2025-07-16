function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arrOfArrs) {
  return arrOfArrs.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timestamp) {
  const [date, hour] = timestamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
}

function createTimeOutEvent(employee, timestamp) {
  const [date, hour] = timestamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, timeInEvent) => {
    return total + wagesEarnedOnDate(employee, timeInEvent.date);
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}

// Exporting functions (for test files if needed)
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll
};

