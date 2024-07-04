import { FeatureProject } from '@/features';
import { ProjectPageLayout } from '@/layouts';

const ProjectPage = () => <FeatureProject />;

ProjectPage.getLayout = (page: React.ReactElement) => <ProjectPageLayout>{page}</ProjectPageLayout>;
export default ProjectPage;
