import { v4 } from 'uuid';
import type { BoardMember, CalendarEvent } from './interfaces';

export const getBoardMembers = async (): Promise<BoardMember[]> => {
  return [
    {
      first_name: 'Moaied',
      last_name: 'Betamour',
      position: 'Audit Committee 2023-2024',
      team: 'Audit Committee'
    },
    {
      first_name: 'Jan',
      last_name: 'Bachok',
      position: 'Audit Committee 2023-2024',
      team: 'Audit Committee'
    },
    {
      first_name: 'Amir',
      last_name: 'Issa',
      position: 'Audit Committee 2023-2024',
      team: 'Audit Committee'
    },
    {
      first_name: 'Aymen',
      last_name: 'Ghokeh',
      position: 'Permanent Council Member',
      team: 'Permanent Council'
    },
    {
      first_name: 'Harun',
      last_name: 'Ates',
      position: 'Permanent Council Member',
      team: 'Permanent Council'
    },
    {
      first_name: 'Nour',
      last_name: 'Adris',
      position: 'Permanent Council Member',
      team: 'Permanent Council'
    },
    {
      first_name: 'Faik',
      last_name: 'Askin',
      position: 'Permanent Council Member',
      team: 'Permanent Council'
    },
    {
      first_name: 'Anees',
      last_name: 'Norouz',
      position: 'Permanent Council Member',
      team: 'Permanent Council'
    },
    {
      first_name: 'Suha',
      last_name: 'Kurmanov',
      position: 'Permanent Council Member',
      team: 'Permanent Council'
    },
    {
      first_name: 'Abdin',
      last_name: 'Karden',
      position: 'Permanent Council Member',
      team: 'Permanent Council'
    },
    {
      first_name: 'Nazir',
      last_name: 'Afamougat',
      position: 'Permanent Council Vice-Chairperson',
      team: 'Permanent Council'
    },
    {
      first_name: 'Zack',
      last_name: 'Barsik',
      position: 'Permanent Council Chairperson',
      team: 'Permanent Council'
    },
    {
      first_name: 'Hamid',
      last_name: 'Shublak',
      position: 'Imam / Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Janit',
      last_name: 'Ghougal',
      position: 'Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Kamar',
      last_name: 'Tsay',
      position: 'Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Zarema',
      last_name: 'Helmi',
      position: 'Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Tambi',
      last_name: 'Tamrok',
      position: 'Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Amjad',
      last_name: 'Mohammad',
      position: 'Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Linda',
      last_name: 'Barsik',
      position: 'Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Danyal',
      last_name: 'Bachok',
      position: 'Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Dana',
      last_name: 'Wojokh',
      position: 'Recording Secretary / Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Murad',
      last_name: 'Quandour',
      position: 'Corresponding Secretary / Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Berrin',
      last_name: 'Altan',
      position: 'Treasurer / Executive Board Member',
      team: 'Executive Board'
    },
    {
      first_name: 'Manaf',
      last_name: 'Stas',
      position: 'Vice President 2023-2024',
      team: 'Executive Board'
    },
    {
      first_name: 'Hakan',
      last_name: 'Cinaz',
      position: 'President 2023-2024',
      team: 'Executive Board'
    }
  ];
};

export const getEvents = async (): Promise<CalendarEvent[]> => {
  return events;
};

const randomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const createEvents = () => {
  const pastDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const futureDates = Array.from({ length: 20 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return [...pastDates, ...futureDates].flatMap((date, index) => {
    return Array.from({ length: randomNumber(0, 4) }, () => {
      return {
        id: v4(),
        title: `Example Event ${index + 1}`,
        description:
          'This course will focus on the basics of improving your cooking skills. We will go over what equipment every cook must own, how to use a knife properly, how to sauté, roasting 101, and much more.  You will have the opportunity to practice your skills, so bring an apron and be prepared to get messy!',
        date: date.toDateString(),
        startTime: '3:00pm',
        endTime: '5:00pm',
        location: 'Wayne, NJ',
        price: '50',
        image: '/cba-photo.jpeg'
      };
    });
  });
};

// Doing this here, so the IDs aren't re-generated every time
// otherwise the details page keeps 404ing.
const events = createEvents();
