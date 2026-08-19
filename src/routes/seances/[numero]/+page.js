import { error } from '@sveltejs/kit';
import { SEANCES, seanceParNumero } from '$lib/data/seances.js';

export const prerender = true;

export function entries() {
  return SEANCES.map((s) => ({ numero: String(s.numero) }));
}

export function load({ params }) {
  const seance = seanceParNumero(params.numero);
  if (!seance) error(404, 'Séance inconnue');
  return { seance };
}
