import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from './EventDetail';
import CinematicEventDetail from './CinematicEventDetail';

const EventRouter: React.FC<any> = (props) => {
  const { id } = useParams<{ id: string }>();

  // Special Cinematic Experience for Kora Kulture
  if (id === 'kora-kulture') {
    return <CinematicEventDetail {...props} />;
  }

  // Standard Premium Detail for others
  return <EventDetail {...props} />;
};

export default EventRouter;
