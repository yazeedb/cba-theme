import { v4 } from 'uuid';
import type { BoardMember, CalendarEvent } from './interfaces';

export const getRecommendedBooks = async () => {
  return books.map((book) => ({
    title: book.title.rendered,
    author: book.acf.author,
    image_url: book._embedded['wp:featuredmedia'][0]?.source_url,
    description: book.acf.description
  }));
};

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

const books = [
  {
    id: 216,
    date: '2024-03-23T22:08:50',
    date_gmt: '2024-03-23T22:08:50',
    guid: {
      rendered: 'http://localhost:8888/wordpress/?post_type=books&#038;p=216'
    },
    modified: '2024-03-23T22:31:38',
    modified_gmt: '2024-03-23T22:31:38',
    slug: 'circassia-born-to-be-free',
    status: 'publish',
    type: 'books',
    link: 'http://localhost:8888/wordpress/books/circassia-born-to-be-free/',
    title: {
      rendered: 'Circassia: Born to Be Free'
    },
    featured_media: 217,
    template: '',
    meta: {
      _acf_changed: false
    },
    acf: {
      page_subtitle: '',
      author: 'Adel Bashqawi',
      description:
        'Many Circassian people have been living in diaspora for more than 150 years. They were forcefully driven out of their homeland by a combination of military and political methods.\r\n\r\nIn this book, author Adel Bashqawi explains the origins, details and outcomes of the Russian-Circassian war and how it was directly responsible for the current situation of Circassians. He discusses the crimes and human rights violations committed against Circassians.\r\n\r\nThe author sheds light on the evolution of the political situation of Circassians in the homeland and in diaspora until the current day, including the various Circassian political bodies.\r\n\r\nThe author also deals with the issue of the Circassian identity and possible legal methods that Circassians can utilize to regain their rights.\r\n\r\nThis book will teach Circassians, young and old, about their history and the history of their homeland. It is a must read for anyone who is interested in the Circassian issue and for anyone who cares about human rights.'
    },
    _links: {
      self: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/books/216'
        }
      ],
      collection: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/books'
        }
      ],
      about: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/types/books'
        }
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media/217'
        }
      ],
      'wp:attachment': [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media?parent=216'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    },
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 217,
          date: '2024-03-23T22:08:45',
          slug: 'circassian-born-to-be-free',
          type: 'attachment',
          link: 'http://localhost:8888/wordpress/books/circassia-born-to-be-free/circassian-born-to-be-free/',
          title: {
            rendered: 'circassian-born-to-be-free'
          },
          author: 1,
          acf: [],
          caption: {
            rendered: ''
          },
          alt_text: '',
          media_type: 'image',
          mime_type: 'image/jpeg',
          media_details: {
            width: 1280,
            height: 1929,
            file: '2024/03/circassian-born-to-be-free.jpeg',
            filesize: 234148,
            sizes: {
              medium: {
                file: 'circassian-born-to-be-free-199x300.jpeg',
                width: 199,
                height: 300,
                filesize: 13090,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-born-to-be-free-199x300.jpeg'
              },
              large: {
                file: 'circassian-born-to-be-free-679x1024.jpeg',
                width: 679,
                height: 1024,
                filesize: 96914,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-born-to-be-free-679x1024.jpeg'
              },
              thumbnail: {
                file: 'circassian-born-to-be-free-150x150.jpeg',
                width: 150,
                height: 150,
                filesize: 6711,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-born-to-be-free-150x150.jpeg'
              },
              medium_large: {
                file: 'circassian-born-to-be-free-768x1157.jpeg',
                width: 768,
                height: 1157,
                filesize: 116982,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-born-to-be-free-768x1157.jpeg'
              },
              '1536x1536': {
                file: 'circassian-born-to-be-free-1019x1536.jpeg',
                width: 1019,
                height: 1536,
                filesize: 184652,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-born-to-be-free-1019x1536.jpeg'
              },
              full: {
                file: 'circassian-born-to-be-free.jpeg',
                width: 1280,
                height: 1929,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-born-to-be-free.jpeg'
              }
            },
            image_meta: {
              aperture: '0',
              credit: '',
              camera: '',
              caption: '',
              created_timestamp: '0',
              copyright: '',
              focal_length: '0',
              iso: '0',
              shutter_speed: '0',
              title: '',
              orientation: '0',
              keywords: []
            }
          },
          source_url: '/circassian-born-to-be-free.jpeg',
          _links: {
            self: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media/217'
              }
            ],
            collection: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media'
              }
            ],
            about: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/types/attachment'
              }
            ],
            author: [
              {
                embeddable: true,
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/users/1'
              }
            ],
            replies: [
              {
                embeddable: true,
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/comments?post=217'
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: 214,
    date: '2024-03-23T22:08:06',
    date_gmt: '2024-03-23T22:08:06',
    guid: {
      rendered: 'http://localhost:8888/wordpress/?post_type=books&#038;p=214'
    },
    modified: '2024-03-23T22:08:06',
    modified_gmt: '2024-03-23T22:08:06',
    slug: 'the-circassian-genocide',
    status: 'publish',
    type: 'books',
    link: 'http://localhost:8888/wordpress/books/the-circassian-genocide/',
    title: {
      rendered: 'The Circassian Genocide'
    },
    featured_media: 215,
    template: '',
    meta: {
      _acf_changed: false
    },
    acf: {
      page_subtitle: '',
      author: 'Walter Richmond',
      description:
        'Circassia was a small independent nation on the northeastern shore of the Black Sea. For no reason other than ethnic hatred, over the course of hundreds of raids the Russians drove the Circassians from their homeland and deported them to the Ottoman Empire. At least 600,000 people lost their lives to massacre, starvation, and the elements while hundreds of thousands more were forced to leave their homeland. By 1864, three-fourths of the population was annihilated, and the Circassians had become one of the first stateless peoples in modern history.\r\n\r\nUsing rare archival materials, Walter Richmond chronicles the history of the war, describes in detail the final genocidal campaign, and follows the Circassians in diaspora through five generations as they struggle to survive and return home. He places the periods of acute genocide, 1821–1822 and 1863–1864, in the larger context of centuries of tension between the two nations and updates the story to the present day as the Circassian community works to gain international recognition of the genocide as the region prepares for the 2014 Winter Olympics in Sochi, the site of the Russians’ final victory.'
    },
    _links: {
      self: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/books/214'
        }
      ],
      collection: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/books'
        }
      ],
      about: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/types/books'
        }
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media/215'
        }
      ],
      'wp:attachment': [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media?parent=214'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    },
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 215,
          date: '2024-03-23T22:07:53',
          slug: 'circassian-genocide',
          type: 'attachment',
          link: 'http://localhost:8888/wordpress/books/the-circassian-genocide/circassian-genocide/',
          title: {
            rendered: 'circassian-genocide'
          },
          author: 1,
          acf: [],
          caption: {
            rendered: ''
          },
          alt_text: 'The Circassian Genocide',
          media_type: 'image',
          mime_type: 'image/jpeg',
          media_details: {
            width: 1280,
            height: 1920,
            file: '2024/03/circassian-genocide.jpeg',
            filesize: 328420,
            sizes: {
              medium: {
                file: 'circassian-genocide-200x300.jpeg',
                width: 200,
                height: 300,
                filesize: 14167,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-genocide-200x300.jpeg'
              },
              large: {
                file: 'circassian-genocide-683x1024.jpeg',
                width: 683,
                height: 1024,
                filesize: 118676,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-genocide-683x1024.jpeg'
              },
              thumbnail: {
                file: 'circassian-genocide-150x150.jpeg',
                width: 150,
                height: 150,
                filesize: 6277,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-genocide-150x150.jpeg'
              },
              medium_large: {
                file: 'circassian-genocide-768x1152.jpeg',
                width: 768,
                height: 1152,
                filesize: 147350,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-genocide-768x1152.jpeg'
              },
              '1536x1536': {
                file: 'circassian-genocide-1024x1536.jpeg',
                width: 1024,
                height: 1536,
                filesize: 247150,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-genocide-1024x1536.jpeg'
              },
              full: {
                file: 'circassian-genocide.jpeg',
                width: 1280,
                height: 1920,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-genocide.jpeg'
              }
            },
            image_meta: {
              aperture: '0',
              credit: '',
              camera: '',
              caption: '',
              created_timestamp: '0',
              copyright: '',
              focal_length: '0',
              iso: '0',
              shutter_speed: '0',
              title: '',
              orientation: '0',
              keywords: []
            }
          },
          source_url: '/circassian-genocide.jpeg',
          _links: {
            self: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media/215'
              }
            ],
            collection: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media'
              }
            ],
            about: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/types/attachment'
              }
            ],
            author: [
              {
                embeddable: true,
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/users/1'
              }
            ],
            replies: [
              {
                embeddable: true,
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/comments?post=215'
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: 212,
    date: '2024-03-23T22:01:16',
    date_gmt: '2024-03-23T22:01:16',
    guid: {
      rendered: 'http://localhost:8888/wordpress/?post_type=books&#038;p=212'
    },
    modified: '2024-03-23T22:05:44',
    modified_gmt: '2024-03-23T22:05:44',
    slug: 'the-circassians-a-handbook',
    status: 'publish',
    type: 'books',
    link: 'http://localhost:8888/wordpress/books/the-circassians-a-handbook/',
    title: {
      rendered: 'The Circassians: A Handbook'
    },
    featured_media: 213,
    template: '',
    meta: {
      _acf_changed: false
    },
    acf: {
      page_subtitle: '',
      author: 'Amjad Jaimoukha',
      description:
        "The Circassians have a long history forged in the crucible of their homeland in the mountains and valleys of the Northwest Caucasus. Of the many peoples of the Caucasus, they are notable for their wide and vociferous diaspora, particularly in Turkey and the Middle East. After living for many centuries in comparative obscurity under the shadow of Russia, the Circassians staged a minor comeback after the collapse of the Soviet Union.\r\n\r\nAs was the case with other regions in the Caucasus, this rebirth into nationhood was swiftly stifled, yet today's Circassian territories have been rediscovered as a cultural and political focus for Circassians globally. This book provides an in-depth description by an insider' of the ancient beliefs, customs and traditions of a remarkable people - offering insights into a fascinating world, much of which has until now remained unknown. This complex universe is unlocked in the hope of spurring more interest in the unique culture of the Circassians."
    },
    _links: {
      self: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/books/212'
        }
      ],
      collection: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/books'
        }
      ],
      about: [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/types/books'
        }
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media/213'
        }
      ],
      'wp:attachment': [
        {
          href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media?parent=212'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    },
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 213,
          date: '2024-03-23T22:04:38',
          slug: 'circassian-handbook',
          type: 'attachment',
          link: 'http://localhost:8888/wordpress/books/the-circassians-a-handbook/circassian-handbook/',
          title: {
            rendered: 'circassian-handbook'
          },
          author: 1,
          acf: [],
          caption: {
            rendered: ''
          },
          alt_text: 'The Circassian Handbook',
          media_type: 'image',
          mime_type: 'image/jpeg',
          media_details: {
            width: 350,
            height: 540,
            file: '2024/03/circassian-handbook.jpeg',
            filesize: 44126,
            sizes: {
              medium: {
                file: 'circassian-handbook-194x300.jpeg',
                width: 194,
                height: 300,
                filesize: 13284,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-handbook-194x300.jpeg'
              },
              thumbnail: {
                file: 'circassian-handbook-150x150.jpeg',
                width: 150,
                height: 150,
                filesize: 6578,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-handbook-150x150.jpeg'
              },
              full: {
                file: 'circassian-handbook.jpeg',
                width: 350,
                height: 540,
                mime_type: 'image/jpeg',
                source_url:
                  'http://localhost:8888/wordpress/wp-content/uploads/2024/03/circassian-handbook.jpeg'
              }
            },
            image_meta: {
              aperture: '0',
              credit: '',
              camera: '',
              caption: '',
              created_timestamp: '0',
              copyright: '',
              focal_length: '0',
              iso: '0',
              shutter_speed: '0',
              title: '',
              orientation: '0',
              keywords: []
            }
          },
          source_url: '/circassian-handbook.jpeg',
          _links: {
            self: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media/213'
              }
            ],
            collection: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/media'
              }
            ],
            about: [
              {
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/types/attachment'
              }
            ],
            author: [
              {
                embeddable: true,
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/users/1'
              }
            ],
            replies: [
              {
                embeddable: true,
                href: 'http://localhost:8888/wordpress/wp-json/wp/v2/comments?post=213'
              }
            ]
          }
        }
      ]
    }
  }
];

const randomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const createEvents = () => {
  const pastDates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const futureDates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return [...pastDates, ...futureDates].flatMap((date, index) => {
    return Array.from({ length: randomNumber(2, 5) }, () => {
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
