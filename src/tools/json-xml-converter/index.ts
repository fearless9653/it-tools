import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.json-xml-converter.title'),
  path: '/json-xml-converter',
  description: translate('tools.json-xml-converter.description'),
  keywords: ['json', 'xml', 'converter', 'json to xml', 'xml to json'],
  component: () => import('./json-xml-converter.vue'),
  icon: Braces,
  createdAt: new Date('2024-08-09'),
});
