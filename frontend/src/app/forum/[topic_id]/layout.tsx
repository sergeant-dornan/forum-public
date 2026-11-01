import http from '@/shared/api/http/HttpClient';
import { TopicRolesProvider } from '@/contexts/TopicRolesContext/TopicRolesContext';
import { isAppError } from '@/shared/utils/Error/Error.guards';
import type { ReactNode } from 'react';

interface TopicLayoutProps {
  children: ReactNode;
  params: Promise<{
    topic_id: string;
  }>;
}

export default async function TopicLayout({ children, params }: TopicLayoutProps) {
  // Получаем айди темы из параметров
  const topicId = (await params).topic_id;
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.getRoles(topicId);
  if (isAppError(result)) throw result;

  return (
    <TopicRolesProvider initialRoles={result.data} topicId={topicId}>
      {children}
    </TopicRolesProvider>
  );
}