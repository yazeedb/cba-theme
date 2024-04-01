import cn from 'classnames';
import {
  addMonths,
  format,
  getDaysInMonth,
  isSameDay,
  isToday,
  startOfMonth
} from 'date-fns';
import { useState, type HTMLProps } from 'react';
import type { CalendarEvent } from '../interfaces';
import { Modal } from './Modal';
import { createEventDetailsUrl } from '../utils';

interface EventCalendarProps {
  events: CalendarEvent[];
}

interface ChosenDay {
  date: Date | null;
  events: CalendarEvent[];
}

const initialChosenDay: ChosenDay = { date: null, events: [] };

export const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenDay, setChosenDay] = useState<ChosenDay>(initialChosenDay);

  function goToToday() {
    setCurrentDate(new Date());
  }

  function updateCalendar(monthOffset: number) {
    setCurrentDate((current) => addMonths(current, monthOffset));
  }

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

  const maxVisibleEventsPerDay = 2;
  const tooManyEvents = (events: CalendarEvent[]) =>
    events.length > maxVisibleEventsPerDay;

  return (
    <>
      <Modal
        isOpen={isModalOpen && chosenDay.date !== null}
        onClose={() => setIsModalOpen(false)}
        onAnimateEnd={() => setChosenDay(initialChosenDay)}
        closeText="Close"
      >
        <header
          id="modal-header"
          className="p-4 flex justify-between items-center text-lg"
        >
          <div className="flex items-center">
            <h1 className="ml-1 font-bold">
              {chosenDay.events.length} events on{' '}
              {format(new Date(chosenDay.date!), 'M/d/yyyy')}
            </h1>
          </div>

          <button onClick={() => setIsModalOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <ul id="modal-section" className="max-h-96 overflow-y-auto">
          {chosenDay.events.map((e) => (
            <li key={e.id}>
              <Event
                linkToFullEvent={true}
                key={e.id}
                event={e}
                className="block m-2 rounded p-4 sm:p-2"
              >
                {e.title}
              </Event>
            </li>
          ))}
        </ul>
      </Modal>

      <div id="calendar" className="lg:flex lg:h-full lg:flex-col">
        <header
          id="calendar-header"
          className="flex items-center justify-between lg:flex-none pb-4 px-4"
        >
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
          </div>
        </header>

        <div
          id="days-of-the-week"
          className="grid grid-cols-7 text-center text-xs sm:text-base"
        >
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div
          id="calendar-body"
          className="grid grid-cols-7 border-l border-t border-slate-200 sm:mx-4"
        >
          {paddingDays.map((day) => (
            <Day key={day} className="bg-gray-50" />
          ))}

          {days.map(({ date, day, isToday, eventsForDay }) => {
            const children = (
              <>
                <time
                  className={cn(
                    'w-5 h-5 m-1 flex items-center justify-center rounded-full p-3',
                    {
                      'bg-green-800 text-white font-bold': isToday
                    }
                  )}
                  dateTime={date.toDateString()}
                >
                  {day}
                </time>

                <div id="events" className="flex flex-col w-full gap-1">
                  {eventsForDay.slice(0, maxVisibleEventsPerDay).map((e) => (
                    <Event
                      key={e.id}
                      event={e}
                      className="w-full py-1 px-2"
                      linkToFullEvent={!tooManyEvents(eventsForDay)}
                    >
                      {e.title}
                    </Event>
                  ))}
                </div>

                {!tooManyEvents(eventsForDay) ? null : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    id="ellipsis-horizontal-icon"
                    className="w-6 h-6 mt-auto ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                )}
              </>
            );

            return (
              <Day
                key={day}
                className="text-gray-900 self-start flex flex-col text-2xs md:text-xs"
                onClick={() => {
                  if (!tooManyEvents(eventsForDay)) return;

                  setChosenDay({ date, events: eventsForDay });
                  setIsModalOpen(true);
                }}
              >
                {tooManyEvents(eventsForDay) ? (
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      setChosenDay({ date, events: eventsForDay });
                      setIsModalOpen(true);
                    }}
                  >
                    {children}
                  </button>
                ) : (
                  children
                )}
              </Day>
            );
          })}
        </div>
      </div>
    </>
  );
};

interface DayProps extends HTMLProps<HTMLDivElement> {}

const Day = ({ children, className, ...rest }: DayProps) => {
  return (
    <div
      {...rest}
      className={cn(
        'flex items-start h-28 text-left border-r border-b border-slate-200 text-xs font-medium overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

interface EventProps extends HTMLProps<HTMLAnchorElement> {
  event: CalendarEvent;
  linkToFullEvent: boolean;
}

const Event = ({ event, className, linkToFullEvent }: EventProps) => {
  const props = {
    key: event.id,
    className: cn(
      'bg-calendar-event whitespace-nowrap overflow-hidden',
      className
    )
  };

  if (linkToFullEvent) {
    return (
      <a href={createEventDetailsUrl(event.id)} {...props}>
        {event.title}
      </a>
    );
  }

  return <span {...props}>{event.title}</span>;
};
