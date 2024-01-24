import Content from '@/containers/home/Content';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Landing from './Landing';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return !session?.user ? <Landing /> : <Content />;
};

export default Home;
