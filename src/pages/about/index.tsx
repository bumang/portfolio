import { FeatureAbout } from '@/features/feature-about';
import { AboutPageLayout } from '@/layouts/about';

const AboutPage = () => <FeatureAbout />;

AboutPage.getLayout = (page: React.ReactElement) => <AboutPageLayout>{page}</AboutPageLayout>;
export default AboutPage;
