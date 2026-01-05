import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.json-yaml-converter.title'),
  path: '/json-yaml-converter',
  description: translate('tools.json-yaml-converter.description'),
  keywords: ['json', 'yaml', 'converter', 'json to yaml', 'yaml to json'],
  component: () => import('./json-yaml-converter.vue'),
  icon: Braces,
  createdAt: new Date('2023-04-10'),
});
