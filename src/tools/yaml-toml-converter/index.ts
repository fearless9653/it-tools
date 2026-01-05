import { AlignJustified } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.yaml-toml-converter.title'),
  path: '/yaml-toml-converter',
  description: translate('tools.yaml-toml-converter.description'),
  keywords: ['toml', 'yaml', 'converter', 'toml to yaml', 'yaml to toml'],
  component: () => import('./yaml-toml-converter.vue'),
  icon: AlignJustified,
  createdAt: new Date('2023-06-23'),
});
