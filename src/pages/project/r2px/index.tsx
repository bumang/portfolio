import { FeatureR2px } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const R2pxPage = () => <FeatureR2px />;

R2pxPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout bgColor="bg-background-lightBlue" page="R2px">
    {page}
  </ProjectPageLayout>
);
export default R2pxPage;
