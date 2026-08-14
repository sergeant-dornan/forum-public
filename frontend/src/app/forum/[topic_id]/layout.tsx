import http from '@/shared/api/http/HttpClient';
import { TopicRolesProvider } from '@/shared/contexts/TopicRolesContext';
import { isAppError } from '@/shared/utils/Error/Error.guards';
import { parseNumber } from '@/shared/utils/parseNumber';
import type { ReactNode } from 'react';

interface TopicLayoutProps {
  children: ReactNode;
  params: Promise<{
    topic_id: string;
  }>;
}

export default async function TopicLayout({ children, params }: TopicLayoutProps) {
  // Получаем айди темы из параметров
  const topicId = parseNumber((await params).topic_id);
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.getRoles(topicId); // Получаем роли {userId: role...}
  if (isAppError(result)) throw result;

  return (
    <TopicRolesProvider initialRoles={result.data} topicId={topicId}>
      {children}
    </TopicRolesProvider>
  );
}