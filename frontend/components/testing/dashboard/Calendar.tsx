import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, subMonths, addMonths } from 'date-fns';

type CalendarProps = {
  visitedDays: string[];
};

const Calendar: React.FC<CalendarProps> = ({ visitedDays }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(currentMonth);
    const startDate = startOfWeek(startMonth);
    const endDate = endOfWeek(endMonth);

    const dayArray = [];
    let day = startDate;

    while (day <= endDate) {
      dayArray.push(day);
      day = addDays(day, 1);
    }
    setDays(dayArray);
  }, [currentMonth]);

  const isVisited = (day: Date) => visitedDays.some(visitedDay => isSameDay(new Date(visitedDay), day));

  const renderDays = () => {
    return days.map((day, index) => (
      <div
        key={index}
        className={`p-2 border rounded-md text-center 
        ${isSameMonth(day, currentMonth) ? '' : 'text-gray-400'} 
        ${isVisited(day) ? 'bg-green-300' : ''} 
        ${isSameDay(day, new Date()) ? 'bg-blue-200' : ''}`}
      >
        {format(day, 'd')}
      </div>
    ));
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-xl font-bold">&lt;</button>
        <h2 className="text-2xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-xl font-bold">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <div className="text-center font-bold">Sun</div>
        <div className="text-center font-bold">Mon</div>
        <div className="text-center font-bold">Tue</div>
        <div className="text-center font-bold">Wed</div>
        <div className="text-center font-bold">Thu</div>
        <div className="text-center font-bold">Fri</div>
        <div className="text-center font-bold">Sat</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
