import { useState, useEffect } from 'react';

import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    fetch('https://meetup-http-default-rtdb.firebaseio.com/meetups.json')
      .then(response => response.json())
      .then(data => {
        const meetups = [];

        for (const key in data) {
          const newMeetup = {
            id: key,
            ...data[key],
          };

          meetups.push(newMeetup);
        }

        setIsLoading(false);
        setMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  return (
    <section>
      <h1>All Meetups Page</h1>
      <MeetupList meetups={meetups} />
    </section>
  );
}

export default AllMeetupsPage;