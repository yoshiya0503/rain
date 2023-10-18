import { Suspense } from "react";
import SettingTemplate from "@/templates/SettingTemplate";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import SettingsContainer from "@/containers/SettingContainer";

export const Settings = () => {
  return (
    <Layout>
      <ScrollLayout>
        <Suspense fallback={<SettingTemplate />}>
          <SettingsContainer />
        </Suspense>
      </ScrollLayout>
    </Layout>
  );
};

export default Settings;
