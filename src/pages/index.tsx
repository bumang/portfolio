import { FeatureHome } from '@/features/feature-home';
import { HomePageLayout } from '@/layouts';

const HomePage = () => <FeatureHome />;

HomePage.getLayout = (page: React.ReactElement) => <HomePageLayout>{page}</HomePageLayout>;
export default HomePage;
