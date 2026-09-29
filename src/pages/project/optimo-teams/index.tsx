import { FeatureOptimoTeams } from '@/features';
import { ProjectPageLayout } from '@/layouts/project/ProjectPageLayout';

const OptimoTeamsPage = () => <FeatureOptimoTeams />;

OptimoTeamsPage.getLayout = (page: React.ReactElement) => (
  <ProjectPageLayout bgColor="bg-[#7B61FF]" page="Optimo Teams">
    {page}
  </ProjectPageLayout>
);
export default OptimoTeamsPage;
