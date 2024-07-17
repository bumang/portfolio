import { FeatureTigg } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const ProjectPage = () => <FeatureTigg />;

ProjectPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout page="Tigg">{page}</ProjectPageLayout>
);
export default ProjectPage;
