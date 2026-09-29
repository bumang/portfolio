import { FeatureDiversio } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const DiversioPage = () => <FeatureDiversio />;

DiversioPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout bgColor="bg-[#5B34E9]" page="Diversio">
    {page}
  </ProjectPageLayout>
);
export default DiversioPage;
