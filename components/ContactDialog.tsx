'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { MailIcon } from 'lucide-react';
import {
  DcyfrDialog,
  DcyfrDialogClose,
  DcyfrDialogContent,
  DcyfrDialogDescription,
  DcyfrDialogFooter,
  DcyfrDialogHeader,
  DcyfrDialogTitle,
  DcyfrDialogTrigger,
} from '@/components/ui/dcyfr-dialog';
import { DcyfrButton } from '@/components/ui/dcyfr-button';
import { DcyfrLabel } from '@/components/ui/dcyfr-label';
import { DcyfrInput } from '@/components/ui/dcyfr-input';
import { DcyfrTextarea } from '@/components/ui/dcyfr-textarea';

/**
 * Contact dialog per openspec/changes/dcyfr-skeleton-content-polish §2.4.
 *
 * Mailto-based submission (per spec recommendation): no backend, no auth,
 * explicit user action. Fire-and-forget. Client-side validation only.
 *
 * Upgrade paths if the mailto flow proves insufficient: Formspree,
 * Web3Forms, or internal `/api/contact` — all drop-in once the form state
 * shape below is stable.
 */

const CONTACT_EMAIL = 'hello@dcyfr.dev';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export interface ContactDialogProps {
  /** Button variant for the trigger. Defaults to "brand". */
  triggerVariant?: 'brand' | 'secure' | 'ghostly' | 'danger';
  /** Button size for the trigger. Defaults to "lg". */
  triggerSize?: 'sm' | 'md' | 'lg';
  /** Optional className on the trigger. */
  triggerClassName?: string;
  /** Trigger label. Defaults to "Get in touch". */
  triggerLabel?: string;
}

export function ContactDialog({
  triggerVariant = 'brand',
  triggerSize = 'lg',
  triggerClassName,
  triggerLabel = 'Get in touch',
}: ContactDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const reset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setErrors({});
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Enter a valid email';
    if (!message.trim()) next.message = 'Message is required';
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      company.trim() ? `Company: ${company.trim()}` : null,
      '',
      message.trim(),
    ]
      .filter(Boolean)
      .join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `dcyfr.work inquiry — ${name.trim()}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    toast.success('Opening your mail app', {
      description: `Message to ${CONTACT_EMAIL} ready to send.`,
    });

    setOpen(false);
    reset();
  };

  return (
    <DcyfrDialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setErrors({});
      }}
    >
      <DcyfrDialogTrigger asChild>
        <DcyfrButton
          variant={triggerVariant}
          size={triggerSize}
          className={triggerClassName}
        >
          <MailIcon className="size-4" aria-hidden="true" />
          {triggerLabel}
        </DcyfrButton>
      </DcyfrDialogTrigger>
      <DcyfrDialogContent variant="secure">
        <DcyfrDialogHeader>
          <DcyfrDialogTitle>Get in touch</DcyfrDialogTitle>
          <DcyfrDialogDescription>
            Tell me about the work. I read every message.
          </DcyfrDialogDescription>
        </DcyfrDialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <DcyfrLabel htmlFor="contact-name" required>
              Name
            </DcyfrLabel>
            <DcyfrInput
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder="Drew Gowan"
              autoComplete="name"
            />
          </div>

          <div className="grid gap-2">
            <DcyfrLabel htmlFor="contact-email" required>
              Email
            </DcyfrLabel>
            <DcyfrInput
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="drew@cyberdrew.dev"
              autoComplete="email"
            />
          </div>

          <div className="grid gap-2">
            <DcyfrLabel htmlFor="contact-company">Company</DcyfrLabel>
            <DcyfrInput
              id="contact-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Optional"
              autoComplete="organization"
            />
          </div>

          <div className="grid gap-2">
            <DcyfrLabel htmlFor="contact-message" required>
              Context
            </DcyfrLabel>
            <DcyfrTextarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={errors.message}
              placeholder="What are you working on? What timeline? What does success look like?"
              rows={5}
            />
          </div>

          <DcyfrDialogFooter>
            <DcyfrDialogClose asChild>
              <DcyfrButton type="button" variant="ghostly" size="md">
                Cancel
              </DcyfrButton>
            </DcyfrDialogClose>
            <DcyfrButton type="submit" variant="brand" size="md">
              Send inquiry
            </DcyfrButton>
          </DcyfrDialogFooter>
        </form>
      </DcyfrDialogContent>
    </DcyfrDialog>
  );
}
