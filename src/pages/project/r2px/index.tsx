import { FeatureR2px } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const ProjectPage = () => <FeatureR2px />;

ProjectPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout page="R2px">{page}</ProjectPageLayout>
);
export default ProjectPage;
