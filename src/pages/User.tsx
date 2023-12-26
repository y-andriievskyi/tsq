import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { useUser } from '../hooks/useUser';
import { Todos } from './components/Todos';
import { Navigation } from '../pages/components/Navigation';

export const User = () => {
  const { userId } = useParams() as { userId: string };
  const { isPending } = useUser({ userId });

  return (
    <>
      <Navigation />
      <div className="page">
        {isPending ? (
          <Loader />
        ) : (
          <div className="user">
            <Todos userId={userId} />
          </div>
        )}
      </div>
    </>
  );
};
