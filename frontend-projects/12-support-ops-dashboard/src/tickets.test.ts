import { describe, expect, it } from 'vitest';
import { filterTickets, getMetrics, tickets } from './tickets';

describe('support ops domain', () => {
  it('filtra por texto e status', () => {
    expect(filterTickets(tickets, 'pay', 'Em andamento')).toHaveLength(1);
  });

  it('calcula métricas operacionais', () => {
    expect(getMetrics(tickets)).toEqual({ open: 4, highPriority: 2, slaRisk: 1 });
  });
});
