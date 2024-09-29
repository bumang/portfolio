import { FeatureSkyleap } from '@/features/feature-skyleap';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const RaraSpacePage = () => <FeatureSkyleap />;

RaraSpacePage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout bgColor="bg-[#167DCE]" page="Skyleap">
    {page}
  </ProjectPageLayout>
);
export default RaraSpacePage;
