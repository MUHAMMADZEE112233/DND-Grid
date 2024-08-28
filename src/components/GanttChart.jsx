import React from 'react';

const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

const generateRandomTasks = () => {
  const tasks = [
    'Market Research',
    'Define Specifications',
    'Overall Architecture',
    'Project Planning',
    'Detail Design',
    'Software Development',
    'Test Plan',
    'Testing & QA',
    'User Documentation',
  ];
  
  return tasks.map(task => {
    const start = getRandomFloat(1, 10);
    const end = start + getRandomFloat(2, 6);
    const slackStart = end + getRandomFloat(1, 3);
    const slackEnd = slackStart + getRandomFloat(1, 3);
    
    return {
      name: task,
      planned: { start, end },
      actual: { start: start + getRandomFloat(0, 2), end: end + getRandomFloat(0, 2) },
      slack: { start: slackStart, end: slackEnd },
    };
  });
};

const tasks = generateRandomTasks();

const GanttChart = () => {
  const weeksInMonth = [
    { month: 'Jan', weeks: 4 },
    { month: 'Feb', weeks: 4 },
    { month: 'Mar', weeks: 4 },
    { month: 'Apr', weeks: 4 },
    { month: 'May', weeks: 4 },
    { month: 'Jun', weeks: 4 },
    { month: 'Jul', weeks: 4 },
    { month: 'Aug', weeks: 4 },
    { month: 'Sep', weeks: 4 },
    { month: 'Oct', weeks: 4 },
    { month: 'Nov', weeks: 4 },
    { month: 'Dec', weeks: 4 },
  ];

  const totalWeeks = weeksInMonth.reduce((acc, month) => acc + month.weeks, 0);

  const renderMonthHeaders = () => (
    <tr>
      <th
        className="border px-2 py-1 sticky left-0 bg-gray-100 z-20"
        rowSpan="2"
        style={{ textAlign: 'center' }}
      >
        Tasks
      </th>
      {weeksInMonth.map((month, index) => (
        <th
          key={index}
          colSpan={month.weeks}
          className="border border-gray-300 px-2 py-1 text-center bg-gray-200"
        >
          {month.month}
        </th>
      ))}
    </tr>
  );

  const renderWeekHeaders = () => (
    <tr>
      {weeksInMonth.map((month) =>
        Array.from({ length: month.weeks }).map((_, i) => (
          <th key={`${month.month}-W${i + 1}`} className="border border-gray-300 px-2 py-1">
            W{i + 1}
          </th>
        ))
      )}
    </tr>
  );

  const renderTaskRows = () => {
    return tasks.map((task, index) => (
      <tr key={index} className="text-center">
        <td className="border px-2 py-1 text-left sticky left-0 bg-white z-30">{task.name}</td>
        {Array.from({ length: totalWeeks }).map((_, weekIndex) => {
          const week = weekIndex + 1;

          const getBarPosition = (start, end) => {
            const cellWidth = 100;
            const barStart = Math.max(0, (start - week) * cellWidth);
            const barEnd = Math.min(cellWidth, (end - week + 1) * cellWidth);
            return barEnd > 0 && barStart < cellWidth
              ? { left: `${barStart}%`, width: `${barEnd - barStart}%` }
              : null;
          };

          let plannedBarStyle = {};
          let actualBarStyle = {};
          let slackBarStyle = {};
          let combinedBarStyle = {};

          if (week >= Math.floor(task.planned.start) && week <= Math.ceil(task.planned.end)) {
            const position = getBarPosition(task.planned.start, task.planned.end);
            if (position) {
              plannedBarStyle = { ...position, backgroundColor: '#1213a7' };
            }
          }

          if (week >= Math.floor(task.actual.start) && week <= Math.ceil(task.actual.end)) {
            const position = getBarPosition(task.actual.start, task.actual.end);
            if (position) {
              actualBarStyle = { ...position, backgroundColor: '#89d8af' };
            }
          }

          if (week >= Math.floor(task.slack.start) && week <= Math.ceil(task.slack.end)) {
            const position = getBarPosition(task.slack.start, task.slack.end);
            if (position) {
              slackBarStyle = { ...position, backgroundColor: '#ff706a' };
            }
          }

          if (actualBarStyle.width && slackBarStyle.width) {
            const actualEnd = parseFloat(actualBarStyle.left) + parseFloat(actualBarStyle.width);
            const slackStart = parseFloat(slackBarStyle.left);
            if (Math.abs(actualEnd - slackStart) < 0.5) {
              combinedBarStyle = {
                left: actualBarStyle.left,
                width: `${(parseFloat(slackBarStyle.left) + parseFloat(slackBarStyle.width)) - parseFloat(actualBarStyle.left)}%`,
                backgroundColor: slackBarStyle.backgroundColor,
              };
              slackBarStyle = {};
            }
          }

          return (
            <td key={weekIndex} className="border border-gray-200 py-1 relative">
              {plannedBarStyle.width && (
                <div
                  className="absolute h-2"
                  style={{
                    ...plannedBarStyle,
                    top: '30%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                  }}
                ></div>
              )}
              {actualBarStyle.width && (
                <div
                  className="absolute h-2"
                  style={{
                    ...actualBarStyle,
                    top: '70%',
                    transform: 'translateY(-50%)',
                    zIndex: 9,
                  }}
                ></div>
              )}
              {combinedBarStyle.width && (
                <div
                  className="absolute h-2"
                  style={{
                    ...combinedBarStyle,
                    top: '70%',
                    transform: 'translateY(-50%)',
                    zIndex: 8,
                  }}
                ></div>
              )}
              {slackBarStyle.width && (
                <div
                  className="absolute h-2"
                  style={{
                    ...slackBarStyle,
                    top: '70%',
                    transform: 'translateY(-50%)',
                    zIndex: 8,
                  }}
                ></div>
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  const renderLegend = () => (
    <div className="flex justify-center mt-4 space-x-6">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4" style={{ backgroundColor: '#1213a7' }}></div>
        <span>Planned</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4" style={{ backgroundColor: '#89d8af' }}></div>
        <span>Actual</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4" style={{ backgroundColor: '#ff706a' }}></div>
        <span>Slack (Delay)</span>
      </div>
    </div>
  );

  return (
    <div className="p-4 h-screen">
      <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4A5568 #E2E8F0' }}>
        <style>
          {`
            /* For Chrome, Edge, and Safari */
            .overflow-x-auto::-webkit-scrollbar {
              height: 6px;
            }
            .overflow-x-auto::-webkit-scrollbar-thumb {
              background-color: #4A5568; /* Darker color */
              border-radius: 10px;
            }
            .overflow-x-auto::-webkit-scrollbar-track {
              background-color: #E2E8F0; /* Lighter color */
            }
          `}
        </style>
        <table className="table-auto border-collapse w-full min-w-max">
          <thead className="bg-gray-100">
            {renderMonthHeaders()}
            {renderWeekHeaders()}
          </thead>
          <tbody>{renderTaskRows()}</tbody>
        </table>
      </div>
      {renderLegend()}
    </div>
  );
};

export default GanttChart;
