import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.json-formatter.title'),
  path: '/json-formatter',
  description: translate('tools.json-formatter.description'),
  keywords: ['json', 'format', 'beautify', 'compress', 'escape', 'unescape', 'convert'],
  component: () => import('./json-formatter.vue'),
  icon: Braces,
});
