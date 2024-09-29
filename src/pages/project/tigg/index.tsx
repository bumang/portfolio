import { FeatureTigg } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const TiggPage = () => <FeatureTigg />;

TiggPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout bgColor="bg-[#8483CE]" page="Tigg">
    {page}
  </ProjectPageLayout>
);
export default TiggPage;
