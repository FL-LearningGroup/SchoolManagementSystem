import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'School',
  pwa: false,
  iconfontUrl: 'https://github.com/FL-LearningGroup/LucasSample/blob/main/front-end/ant-design-pro/framework-analyse/src/assets/logo.svg',
};

export type { DefaultSettings };

export default proSettings;
