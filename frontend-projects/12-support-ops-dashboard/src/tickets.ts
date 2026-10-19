export type TicketStatus = 'Novo' | 'Em andamento' | 'Resolvido';
export type Priority = 'Alta' | 'Média' | 'Baixa';

export type Ticket = {
  id: number;
  customer: string;
  subject: string;
  status: TicketStatus;
  priority: Priority;
  ageHours: number;
};

export const tickets: Ticket[] = [
  { id: 101, customer: 'Alpha Tech', subject: 'Falha no checkout', status: 'Novo', priority: 'Alta', ageHours: 6 },
  { id: 102, customer: 'Nova Varejo', subject: 'Dúvida de faturamento', status: 'Em andamento', priority: 'Média', ageHours: 18 },
  { id: 103, customer: 'Orbe Labs', subject: 'Acesso bloqueado', status: 'Resolvido', priority: 'Alta', ageHours: 4 },
  { id: 104, customer: 'Linha Sul', subject: 'Atualização cadastral', status: 'Novo', priority: 'Baixa', ageHours: 28 },
  { id: 105, customer: 'Verde Pay', subject: 'Integração indisponível', status: 'Em andamento', priority: 'Alta', ageHours: 11 },
];

export function filterTickets(items: Ticket[], query: string, status: string) {
  const normalized = query.trim().toLocaleLowerCase('pt-BR');
  return items.filter((ticket) => {
    const matchesText = !normalized || `${ticket.customer} ${ticket.subject}`.toLocaleLowerCase('pt-BR').includes(normalized);
    const matchesStatus = status === 'Todos' || ticket.status === status;
    return matchesText && matchesStatus;
  });
}

export function getMetrics(items: Ticket[]) {
  return {
    open: items.filter((ticket) => ticket.status !== 'Resolvido').length,
    highPriority: items.filter((ticket) => ticket.priority === 'Alta' && ticket.status !== 'Resolvido').length,
    slaRisk: items.filter((ticket) => ticket.ageHours >= 24 && ticket.status !== 'Resolvido').length,
  };
}
