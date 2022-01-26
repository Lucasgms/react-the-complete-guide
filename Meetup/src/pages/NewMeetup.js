import { useHistory } from 'react-router-dom';

import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const { replace } = useHistory();

  function submitHandler(data) {
    fetch(
      'https://meetup-http-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(() => {
      replace('/');
    });
  }

  return (
    <section>
      <h1>New Meetup Page</h1>
      <NewMeetupForm onSubmit={submitHandler} />
    </section>
  );
}

export default NewMeetupPage;