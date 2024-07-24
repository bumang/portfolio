import { FeatureRara } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const RaraSpacePage = () => <FeatureRara />;

RaraSpacePage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout page="Rara Space">{page}</ProjectPageLayout>
);
export default RaraSpacePage;
