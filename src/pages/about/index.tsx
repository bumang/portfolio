import { FeatureAbout } from '@/features/feature-about';
import { AboutPageLayout } from '@/layouts/about';

const ProjectPage = () => <FeatureAbout />;

ProjectPage.getLayout = (page: React.ReactElement) => <AboutPageLayout>{page}</AboutPageLayout>;
export default ProjectPage;
