import React, { useMemo, useState, useCallback, useRef } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import * as dragAndDropModule from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./App.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const withDragAndDrop = dragAndDropModule.default?.default || dragAndDropModule.default || dragAndDropModule;
const DnDCalendar = withDragAndDrop(Calendar);

const CustomEvent = React.memo(
  ({ event, onRender }) => {
    React.useEffect(() => {
      onRender(event.id, event.title);
    }, [event.id, event.title]); // only re-run if id/title actually changed
    return <span>{event.title}</span>;
  },
  (prevProps, nextProps) =>
    prevProps.event.id === nextProps.event.id &&
    prevProps.event.title === nextProps.event.title &&
    prevProps.event.start?.getTime() === nextProps.event.start?.getTime() &&
    prevProps.event.end?.getTime() === nextProps.event.end?.getTime()
);

function App() {
  const [events, setEvents] = useState([
    { id: 1, title: "Instagram Post", start: new Date(2026, 8, 16, 10, 0), end: new Date(2026, 8, 16, 11, 0) },
    { id: 2, title: "Facebook Campaign", start: new Date(2026, 8, 18, 14, 0), end: new Date(2026, 8, 18, 15, 0) },
    { id: 3, title: "Twitter Update", start: new Date(2026, 8, 20, 12, 0), end: new Date(2026, 8, 20, 13, 0) },
  ]);

  const [renderStats, setRenderStats] = useState({});
  const appRenderCount = useRef(0);
  appRenderCount.current += 1;

  const handleEventRender = useCallback((id, title) => {
    setRenderStats((prev) => {
      const prevCount = prev[id]?.count || 0;
      return { ...prev, [id]: { title, count: prevCount + 1 } };
    });
  }, []);

  const calendarEvents = useMemo(() => events, [events]);

  // FIX: memoize the components object itself so React.memo on CustomEvent
  // actually works — an inline function here recreated every render and
  // broke memoization, causing the infinite counter loop.
  const eventComponents = useMemo(
    () => ({
      event: (props) => <CustomEvent {...props} onRender={handleEventRender} />,
    }),
    [handleEventRender]
  );

  const handleEventClick = (event) => alert(`Selected: ${event.title}`);

  const moveEvent = useCallback(({ event, start, end }) => {
    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === event.id) ?? {};
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...existing, start, end }];
    });
  }, []);

  const resizeEvent = useCallback(({ event, start, end }) => {
    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === event.id) ?? {};
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...existing, start, end }];
    });
  }, []);

  return (
    <div className="app">
      <h1>📅 Social Media Content Calendar</h1>
      <p className="subtitle">Manage and schedule your social media posts</p>

      <div
        style={{
          background: "#eef6ff",
          border: "1px solid #b3d7ff",
          borderRadius: "8px",
          padding: "10px 16px",
          margin: "12px 0",
          fontSize: "14px",
        }}
      >
        <strong>⚡ Performance Optimization Active:</strong> React.memo, useMemo &
        useCallback prevent unnecessary re-renders. App rendered{" "}
        <strong>{appRenderCount.current}</strong> time(s).
      </div>

      <div className="calendar-container">
        <DnDCalendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={["month", "week", "day"]}
          defaultDate={new Date(2026, 8, 16)}
          style={{ height: 600 }}
          onSelectEvent={handleEventClick}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable
          draggableAccessor={() => true}
          components={eventComponents}
        />
      </div>

      <div
        style={{
          marginTop: "16px",
          padding: "12px 16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        <h3 style={{ marginTop: 0 }}>🔍 Render Monitor</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
              <th>Event</th>
              <th>Render Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(renderStats).map((stat, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td>{stat.title}</td>
                <td>{stat.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: "12px", color: "#777", marginBottom: 0 }}>
          Only the event you drag or resize should increase its count — others stay
          unchanged thanks to React.memo.
        </p>
      </div>
    </div>
  );
}

export default App;