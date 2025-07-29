import React from 'react';
import { useParams } from 'react-router-dom';
import SpacesList from '../components/spaces/SpaceList';
import SpaceDetails from '../components/spaces/SpaceDetails';
import { Helmet } from 'react-helmet-async';

const SpacesPage: React.FC = () => {
  const { spaceId } = useParams<{ spaceId?: string }>();

  return (
    <>
      <Helmet>
        <title>{spaceId ? 'Space Details' : 'Spaces'} | SmartSpace</title>
        <meta 
          name="description" 
          content={spaceId 
            ? "View and book this space for your next event" 
            : "Browse and book available spaces for your events and meetings"
          } 
        />
      </Helmet>
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
        {spaceId ? <SpaceDetails /> : <SpacesList />}
      </main>
    </>
  );
};

export default SpacesPage;