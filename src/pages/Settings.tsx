import { Suspense } from "react";
import SettingTemplate from "@/templates/SettingTemplate";
import Layout from "@/templates/Layout";
import HeaderLayout from "@/templates/HeaderLayout";
import SettingsContainer from "@/containers/SettingContainer";

export const Settings = () => {
  return (
    <Layout>
      <HeaderLayout history>
        <Suspense fallback={<SettingTemplate />}>
          <SettingsContainer />
        </Suspense>
      </HeaderLayout>
    </Layout>
  );
};

export default Settings;
