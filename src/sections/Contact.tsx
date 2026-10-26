import { useState, type FormEvent } from 'react';
import StrokeText from '../components/reactbits/StrokeText';
import { CONTACT_EMAIL } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { track } from '../lib/track';

type Field = 'name' | 'email' | 'subject' | 'company' | 'phone' | 'message';
type Status = 'idle' | 'sending' | 'ok' | 'error';

const FIELDS: { id: Field; label: string; type?: string; required?: boolean; autoComplete?: string; wide?: boolean }[] = [
  { id: 'name', label: 'Nombre', required: true, autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { id: 'company', label: 'Empresa', autoComplete: 'organization' },
  { id: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
  { id: 'subject', label: 'Asunto', required: true, wide: true },
];

// Set VITE_CONTACT_ENDPOINT (e.g. a Formspree / Getform / serverless URL) to enable real delivery.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

function validate(v: Record<Field, string>) {
  const e: Partial<Record<Field, string>> = {};
  if (v.name.trim().length < 2) e.name = 'Ingresa tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'Ingresa un email válido.';
  if (v.phone && !/^[+\d\s()-]{7,}$/.test(v.phone)) e.phone = 'Teléfono no válido.';
  if (v.subject.trim().length < 3) e.subject = 'Cuéntanos el asunto.';
  if (v.message.trim().length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres.';
  return e;
}

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<Field, string>;
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise(r => setTimeout(r, 900)); // placeholder until an endpoint is configured
      }
      setStatus('ok');
      track('contact_submit');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputCls = (f: Field) =>
    `peer w-full border-0 border-b-2 bg-transparent px-0 pt-7 pb-3 text-lg text-white outline-none transition-colors placeholder-transparent focus:border-sun ${
      errors[f] ? 'border-red-400' : 'border-line'
    }`;
  const labelCls =
    'pointer-events-none absolute top-7 left-0 text-lg text-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-[0.18em] peer-focus:text-sun peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:uppercase';

  return (
    <section ref={ref} id="contacto" aria-labelledby="contacto-title" className="relative overflow-hidden bg-ink-2 px-4 py-28 md:px-10 md:py-40 xl:pr-[300px]">
      <p className="eyebrow mb-10" data-reveal><b>06</b> Contacto</p>
      <h2 id="contacto-title" className="sr-only">Hagamos crecer tu marca</h2>
      <div aria-hidden="true" className="section-stroke mb-16">
        <StrokeText text="Hagamos crecer" trigger="scroll" strokeColor="#EEC42F" fillColor="#FFFFFF" fontSize={96} fontWeight={800} letterSpacing={-2} drawDuration={1.4} />
        <StrokeText text="tu marca." trigger="scroll" strokeColor="#EEC42F" fillColor="#EEC42F" fontSize={96} fontWeight={800} letterSpacing={-2} drawDuration={1.4} fillDelay={0.35} />
      </div>

      <div className="grid gap-16 lg:grid-cols-12">
        <aside className="space-y-8 lg:col-span-4" data-reveal>
          <p className="text-lg leading-relaxed text-white/80">
            Cuéntanos dónde está tu marca hoy y hacia dónde quieres llevarla. Respondemos en menos de 48 horas hábiles.
          </p>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-mute uppercase">Escríbenos</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-block border-b-2 border-sun text-xl font-bold hover:text-sun">{CONTACT_EMAIL}</a>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-mute uppercase">Modalidad</p>
            <p className="mt-2 text-xl font-bold">Remote-first · Santiago, Chile</p>
          </div>
        </aside>

        <form noValidate onSubmit={onSubmit} className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:col-span-8" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
          {FIELDS.map(f => (
            <div key={f.id} className={`relative ${f.wide ? 'md:col-span-2' : ''}`}>
              <input
                id={f.id}
                name={f.id}
                type={f.type ?? 'text'}
                placeholder={f.label}
                autoComplete={f.autoComplete}
                required={f.required}
                aria-invalid={!!errors[f.id]}
                aria-describedby={errors[f.id] ? `${f.id}-err` : undefined}
                className={inputCls(f.id)}
              />
              <label htmlFor={f.id} className={labelCls}>
                {f.label}{f.required && <span className="text-sun"> *</span>}
              </label>
              {errors[f.id] && <p id={`${f.id}-err`} className="mt-2 text-sm text-red-300">{errors[f.id]}</p>}
            </div>
          ))}
          <div className="relative md:col-span-2">
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Mensaje"
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-err' : undefined}
              className={`${inputCls('message')} resize-y`}
            />
            <label htmlFor="message" className={labelCls}>Mensaje<span className="text-sun"> *</span></label>
            {errors.message && <p id="message-err" className="mt-2 text-sm text-red-300">{errors.message}</p>}
          </div>

          <div className="flex flex-col gap-6 md:col-span-2 md:flex-row md:items-center">
            <button type="submit" disabled={status === 'sending'} className="btn-sun !min-h-[64px] !px-10 text-base disabled:opacity-60">
              {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'} <span className="arrow" aria-hidden="true">→</span>
            </button>
            <p role="status" aria-live="polite" className="text-sm font-semibold">
              {status === 'ok' && <span className="text-sun">¡Gracias! Recibimos tu mensaje y te contactaremos pronto.</span>}
              {status === 'error' && <span className="text-red-300">No pudimos enviar el mensaje. Intenta otra vez o escríbenos a {CONTACT_EMAIL}.</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
