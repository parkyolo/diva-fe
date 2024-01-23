import Header from '@/components/Header';
import Content from '@/containers/home/Content';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Landing from './Landing';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Header></Header>
      {/* <Content /> */}
      {!session?.user ? <Landing /> : <Content />}
    </main>
  );
};

export default Home;
