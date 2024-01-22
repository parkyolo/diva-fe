import Header from '@/components/Header';
import Content from '@/containers/home/Content';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return <main>{!session?.user ? <Content /> : <></>}</main>;
};

export default Home;
