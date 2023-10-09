import { Suspense } from "react";
import SettingTemplate from "@/templates/SettingTemplate";
import Layout from "@/templates/Layout";
import HistoryLayout from "@/templates/HistoryLayout";
import SettingsContainer from "@/containers/SettingContainer";

export const Settings = () => {
  return (
    <Layout>
      <HistoryLayout>
        <Suspense fallback={<SettingTemplate />}>
          <SettingsContainer />
        </Suspense>
      </HistoryLayout>
    </Layout>
  );
};

export default Settings;
