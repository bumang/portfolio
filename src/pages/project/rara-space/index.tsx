import { FeatureRara } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const ProjectPage = () => <FeatureRara />;

ProjectPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout page="Rara Space">{page}</ProjectPageLayout>
);
export default ProjectPage;
