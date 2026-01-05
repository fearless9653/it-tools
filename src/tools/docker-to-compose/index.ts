import { BrandDocker } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.docker-to-compose.title'),
  path: '/docker-to-compose',
  description: translate('tools.docker-to-compose.description'),
  keywords: ['docker', 'run', 'compose', 'yaml', 'yml', 'convert', 'deamon'],
  component: () => import('./docker-to-compose.vue'),
  icon: BrandDocker,
});
