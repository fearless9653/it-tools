import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.json-toml-converter.title'),
  path: '/json-toml-converter',
  description: translate('tools.json-toml-converter.description'),
  keywords: ['json', 'toml', 'converter', 'json to toml', 'toml to json'],
  component: () => import('./json-toml-converter.vue'),
  icon: Braces,
  createdAt: new Date('2023-06-23'),
});
