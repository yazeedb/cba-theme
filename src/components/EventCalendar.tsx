import cn from 'classnames';
import {
  addMonths,
  getDaysInMonth,
  isSameDay,
  isToday,
  startOfMonth
} from 'date-fns';
import { useState, type ButtonHTMLAttributes } from 'react';
import type { CalendarEvent } from '../interfaces';

interface EventCalendarProps {
  events: CalendarEvent[];
}

export const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  function goToToday() {
    setCurrentDate(new Date()); // Resets to today's date
  }

  function updateCalendar(monthOffset: number) {
    setCurrentDate((current) => addMonths(current, monthOffset));
  }

  // Simplified with date-fns
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i + 1
    );

    const eventsForDay = events.filter((event) =>
      isSameDay(new Date(event.date), date)
    );

    return {
      day: i + 1,
      isToday: isToday(date),
      date,
      eventsForDay
    };
  });

  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between lg:flex-none pb-4">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime={currentDate.toDateString()}>
            {currentDate.toLocaleDateString('default', {
              month: 'long',
              year: 'numeric'
            })}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-8 items-center justify-center rounded-l-md border-y border-l border-gray-300 text-gray-400 hover:text-gray-500 focus:relative pr-0 hover:bg-gray-50"
              onClick={() => updateCalendar(-1)}
            >
              <span className="sr-only">Previous month</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              type="button"
              className="h-9 border-y border-gray-300 px-3.5 text-sm font-semibold text-cta-text-color hover:bg-gray-50 focus:relative"
              onClick={() => goToToday()}
            >
              <span className="hidden md:block">Today</span>

              <span className="md:hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primary-green"
                >
                  <path d="M5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V6C3 4.9 3.9 4 5 4ZM5 9V19H19V9H5Z" />
                  <path d="M13 13H16V16H13V13ZM7 2C7.26522 2 7.51957 2.10536 7.70711 2.29289C7.89464 2.48043 8 2.73478 8 3V6C8 6.26522 7.89464 6.51957 7.70711 6.70711C7.51957 6.89464 7.26522 7 7 7C6.73478 7 6.48043 6.89464 6.29289 6.70711C6.10536 6.51957 6 6.26522 6 6V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2ZM17 2C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V6C18 6.26522 17.8946 6.51957 17.7071 6.70711C17.5196 6.89464 17.2652 7 17 7C16.7348 7 16.4804 6.89464 16.2929 6.70711C16.1054 6.51957 16 6.26522 16 6V3C16 2.73478 16.1054 2.48043 16.2929 2.29289C16.4804 2.10536 16.7348 2 17 2Z" />
                </svg>
              </span>
            </button>

            <button
              type="button"
              className="flex h-9 w-8 items-center justify-center rounded-r-md border-y border-r border-gray-300 text-gray-400 hover:text-gray-500 focus:relative pl-0 hover:bg-gray-50"
              onClick={() => updateCalendar(1)}
            >
              <span className="sr-only">Next month</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <button type="button" className="cta-button-style ml-2 rounded-full">
            +
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 border-l border-t border-slate-200">
        {paddingDays.map((day) => (
          <Day
            key={day}
            className="bg-gray-50  text-gray-500 hover:bg-gray-100"
          />
        ))}

        {days.map(({ date, day, isToday, eventsForDay }) => (
          <Day
            key={day}
            className={cn('text-gray-900 self-start flex flex-col', {
              'bg-slate-200': isToday,
              'bg-white hover:bg-gray-50': !isToday
            })}
          >
            <time className="px-3 py-2" dateTime={date.toDateString()}>
              {day}
            </time>

            {eventsForDay.map((e) => (
              <div
                key={e.id}
                className="text-xs p-1 bg-green-200 whitespace-nowrap overflow-hidden"
              >
                {e.title}
              </div>
            ))}
          </Day>
        ))}
      </div>
    </div>
  );
};

interface DayProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Day = ({ children, className, ...rest }: DayProps) => {
  return (
    <button
      {...rest}
      type="button"
      className={cn(
        'flex items-start h-14 md:h-28 focus:z-10 border-r border-b border-slate-200 text-xs font-medium',
        className
      )}
    >
      {children}
    </button>
  );
};
