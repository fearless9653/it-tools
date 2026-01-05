import { List } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.json-csv-converter.title'),
  path: '/json-csv-converter',
  description: translate('tools.json-csv-converter.description'),
  keywords: ['json', 'csv', 'convert', 'converter', 'json to csv', 'csv to json'],
  component: () => import('./json-csv-converter.vue'),
  icon: List,
  createdAt: new Date('2023-06-18'),
});
