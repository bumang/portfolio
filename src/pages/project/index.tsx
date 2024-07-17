import { FeatureProject } from '@/features';
import { ProjectsPageLayout } from '@/layouts';

const ProjectPage = () => <FeatureProject />;

ProjectPage.getLayout = (page: React.ReactElement) => (
  <ProjectsPageLayout>{page}</ProjectsPageLayout>
);
export default ProjectPage;
