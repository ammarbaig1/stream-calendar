import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';

import type { Event } from './types';

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement = document.querySelector<HTMLDivElement>('[data-element="calendar"]');
  if (!calendarElement) return;

  const events = getEvents();
  console.log({ events });

  const calendar = new Calendar(calendarElement, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, listPlugin, multiMonthPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title multiMonthYear prev,next',
      center: '',
      right: '',
    },

    events,
    // [
    //   {
    //     title: 'finest',
    //     start: '2024-01-10',
    //     end: '2024-01-11',
    //     desc: 'Haaloo',
    //   },
    // ],

    //  eventClick(data) {
    //   const dialogBoxElements = document.getElementsByClassName('dailog_box');
    //   if (dialogBoxElements.length > 0) {
    //     const dialogBox = dialogBoxElements[0];
    //     dialogBox.classList.remove('none');
    //   }

    // events,
    // eventClick(data) {
    //   alert(`User clicked the event ${data.event.title}`);
    // },
  });

  calendar.render();
});

const getEvents = () => {
  const scripts = document.querySelectorAll<HTMLScriptElement>('[data-element="event-data"]');
  const events = [...scripts].map((script) => {
    const event: Event = JSON.parse(script.textContent!);
    event.start = new Date(event.start);
    event.end = new Date(event.end);

    return event;
  });

  return events;
};
