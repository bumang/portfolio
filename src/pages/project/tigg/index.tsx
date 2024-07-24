import { FeatureTigg } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const TiggPage = () => <FeatureTigg />;

TiggPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout page="Tigg">{page}</ProjectPageLayout>
);
export default TiggPage;
